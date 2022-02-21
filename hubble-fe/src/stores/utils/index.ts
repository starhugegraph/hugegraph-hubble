import { isUndefined, size } from 'lodash-es';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import isBoolean from 'validator/lib/isBoolean';
import isISO8601 from 'validator/lib/isISO8601';
import isUUID from 'validator/lib/isUUID';
import isEmpty from 'validator/lib/isEmpty';

import type vis from 'vis-network';
import type {
  GraphNode,
  GraphEdge
} from '../types/GraphManagementStore/dataAnalyzeStore';
import type {
  VertexTypeProperty,
  MetadataProperty
} from '../types/GraphManagementStore/metadataConfigsStore';

/* variables */

export const vertexRadiusMapping: Record<string, number> = {
  HUGE: 40,
  BIG: 30,
  NORMAL: 20,
  SMALL: 10,
  TINY: 1
};

export const edgeWidthMapping: Record<string, number> = {
  THICK: 45,
  NORMAL: 20,
  FINE: -10
};

/* functions */

export function checkIfLocalNetworkOffline(error: any) {
  if (error.request) {
    throw new Error('网络异常，请稍后重试');
  }
}

export function mapMetadataProperties(
  properties: VertexTypeProperty[],
  propertyCollection: MetadataProperty[]
) {
  const mappedProperties: Record<string, string> = {};

  properties.forEach(({ name }) => {
    const value = propertyCollection.find(
      ({ name: propertyName }) => propertyName === name
    )!.data_type;

    mappedProperties[name] = value;
  });

  return mappedProperties;
}

export function generateGraphModeId(
  id: string,
  source: string,
  target: string
): string {
  return `${source}-${id}->${target}`;
}

export function convertArrayToString(
  values: any[] | any,
  separtor: string = ','
) {
  return Array.isArray(values)
    ? values.filter((value) => value !== '').join(separtor)
    : String(values);
}

export function validateGraphProperty(
  type: string,
  value: string,
  premitEmpty: boolean = false
) {
  if (premitEmpty) {
    if (value === '') {
      return true;
    }
  }

  switch (type) {
    case 'BOOLEAN':
      return isBoolean(value);
    case 'BYTE':
      return isInt(value) && Number(value) > -128 && Number(value) <= 127;
    case 'INT':
    case 'LONG':
      return isInt(value);
    case 'FLOAT':
    case 'DOUBLE':
      return isFloat(value);
    case 'TEXT':
    case 'BLOB':
      return !isEmpty(value);
    case 'DATE':
      return isISO8601(value);
    case 'UUID':
      return isUUID(value);
  }
}

export function addGraphNodes(
  collection: GraphNode[],
  visGraphNodes: vis.data.DataSet<GraphNode>,
  vertexSizeMapping: Record<string, string>,
  colorMappings: Record<string, string>,
  displayFieldMappings: Record<string, string[]>
) {
  collection.forEach(({ id, label, properties }) => {
    const joinedLabel = !isUndefined(displayFieldMappings[label])
      ? displayFieldMappings[label]
        .map((field) => (field === '~id' ? id : properties[field]))
        .filter((label) => label !== undefined && label !== null)
        .join('-')
      : id;

    visGraphNodes.add({
      id,
      label:
        size(joinedLabel) <= 15
          ? joinedLabel
          : joinedLabel.slice(0, 15) + '...',
      vLabel: label,
      value: vertexRadiusMapping[vertexSizeMapping[label]],
      font: { size: 16 },
      properties,
      title: `
            <div class="tooltip-fields">
              <div>顶点类型：</div>
              <div>${label}</div>
            </div>
            <div class="tooltip-fields">
              <div>顶点ID：</div>
              <div>${id}</div>
            </div>
            ${Object.entries(properties)
          .map(([key, value]) => {
            return `<div class="tooltip-fields">
                          <div>${key}: </div>
                          <div>${convertArrayToString(value)}</div>
                        </div>`;
          })
          .join('')}
          `,
      color: {
        background: colorMappings[label] || '#5c73e6',
        border: colorMappings[label] || '#5c73e6',
        highlight: { background: '#fb6a02', border: '#fb6a02' },
        hover: { background: '#ec3112', border: '#ec3112' }
      },
      // reveal label when zoom to max
      scaling: {
        label: {
          max: Infinity,
          maxVisible: Infinity
        }
      },
      chosen: {
        node(values: any, id: string, selected: boolean, hovering: boolean) {
          if (hovering || selected) {
            values.shadow = true;
            values.shadowColor = 'rgba(0, 0, 0, 0.6)';
            values.shadowX = 0;
            values.shadowY = 0;
            values.shadowSize = 25;
          }

          if (selected) {
            values.size += 5;
          }
        }
      }
    });
  });
}

export function addGraphEdges(
  collection: GraphEdge[],
  visGraphEdges: vis.data.DataSet<GraphEdge>,
  colorMappings: Record<string, string>,
  edgeThicknessMappings: Record<string, string>,
  edgeWithArrowMappings: Record<string, boolean>,
  displayFieldMappings: Record<string, string[]>
) {
  collection.forEach(({ id, label, source, target, properties }) => {
    const joinedLabel = displayFieldMappings[label]
      .map((field) => (field === '~id' ? label : properties[field]))
      .join('-');

    visGraphEdges.add({
      id,
      label:
        joinedLabel.length <= 15
          ? joinedLabel
          : joinedLabel.slice(0, 15) + '...',
      properties,
      source,
      target,
      from: source,
      to: target,
      font: { size: 16, strokeWidth: 0, color: '#666' },
      arrows: edgeWithArrowMappings[label] ? 'to' : '',
      color: colorMappings[label],
      value: edgeWidthMapping[edgeThicknessMappings[label]],
      title: `
            <div class="tooltip-fields">
              <div>边类型：</div>
            <div>${label}</div>
            </div>
            <div class="tooltip-fields">
              <div>边ID：</div>
              <div>${id}</div>
            </div>
            ${Object.entries(properties)
          .map(([key, value]) => {
            return `<div class="tooltip-fields">
                            <div>${key}: </div>
                            <div>${convertArrayToString(value)}</div>
                          </div>`;
          })
          .join('')}
          `
    });
  });
}

export function formatVertexIdText(
  text: string,
  replacedText: string,
  revert: boolean = false
) {
  if (!revert) {
    return text === '~id' ? replacedText : text;
  } else {
    return text === replacedText ? '~id' : text;
  }
}

export function isGtNegativeOneButZero(value: string | number) {
  if (typeof value === 'number') {
    value = String(value);
  }

  return !(
    !isEmpty(value) &&
    (!isInt(value as string, { min: -1 }) || String(Number(value)) === '0')
  );
}

export function defaultDateTimeParams() {
  (Date.prototype as any).Format = function (fmt: string) {
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? ((o as any)[k]) : (("00" + (o as any)[k]).substr(("" + (o as any)[k]).length)));
    return fmt;
  }
  return {
    start: (new Date() as any).Format("yyyy-MM-dd") + " 00:00:00",
    end: (new Date() as any).Format("yyyy-MM-dd") + " 23:59:59"
  }
}

export function compKeyObj(path: string) {
  switch (path) {
    case "/graph-management/0/data-analyze":
      return {
        menuObj: {
          c_key: "1",
          f_key: "sub1"
        },
        headerCurrentKey: "0"
      }
    case "/graph-management/0/async-tasks":
      return {
        menuObj: {
          c_key: "1",
          f_key: "sub1"
        },
        headerCurrentKey: "1"
      }
    case "/graph-management/0/metadata-configs":
      return {
        menuObj: {
          c_key: "2",
          f_key: "sub1"
        },
        headerCurrentKey: "0"
      }
    case "/graph-management/0/data-import/import-manager":
      return {
        menuObj: {
          c_key: "2",
          f_key: "sub1"
        },
        headerCurrentKey: "1"
      }
    case "/graph-management/management":
      return {
        menuObj: {
          c_key: "2",
          f_key: "sub1"
        },
        headerCurrentKey: "2"
      }
    case "/graph-management/schema":
      return {
        menuObj: {
          c_key: "2",
          f_key: "sub1"
        },
        headerCurrentKey: "3"
      }
    case "/graph-management/0/role":
      return {
        menuObj: {
          c_key: "3",
          f_key: "sub1"
        },
        headerCurrentKey: "0"
      }
    case "/graph-management/resources":
      return {
        menuObj: {
          c_key: "3",
          f_key: "sub1"
        },
        headerCurrentKey: "1"
      }
    case "/graph-management/user":
      return {
        menuObj: {
          c_key: "3",
          f_key: "sub1"
        },
        headerCurrentKey: "2"
      }
    case "/operations-management/1/service":
      return {
        menuObj: {
          c_key: "4",
          f_key: "sub2"
        },
        headerCurrentKey: "0"
      }
    case "/operations-management/1/storage":
      return {
        menuObj: {
          c_key: "4",
          f_key: "sub2"
        },
        headerCurrentKey: "1"
      }
    case "/operations-management/1/computing":
      return {
        menuObj: {
          c_key: "4",
          f_key: "sub2"
        },
        headerCurrentKey: "2"
      }
    case "/operations-management/1/pd":
      return {
        menuObj: {
          c_key: "4",
          f_key: "sub2"
        },
        headerCurrentKey: "3"
      }
    case "/operations-management/1/log":
      return {
        menuObj: {
          c_key: "7",
          f_key: "sub2"
        },
        headerCurrentKey: "0"
      }
    case "/operations-management/1/Audit":
      return {
        menuObj: {
          c_key: "8",
          f_key: "sub2"
        },
        headerCurrentKey: "0"
      }
    case "/system-management/2/tenant":
      return {
        menuObj: {
          c_key: "5",
          f_key: "sub3"
        },
        headerCurrentKey: "0"
      }
    case "/system-management/2/User":
      return {
        menuObj: {
          c_key: "6",
          f_key: "sub3"
        },
        headerCurrentKey: "0"
      }

    default:
      return {
        menuObj: {
          c_key: "1",
          f_key: "sub1"
        },
        headerCurrentKey: "0"
      }
  }
}
