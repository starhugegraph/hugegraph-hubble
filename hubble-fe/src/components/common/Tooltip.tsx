import React from 'react';
import { observer } from 'mobx-react';
import TooltipTrigger, { Trigger } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import {Spin} from 'antd'
import type { Placement, Modifiers } from 'popper.js';

export interface TooltipProps {
  placement: Placement;
  tooltipShown?: boolean;
  trigger?: Trigger;
  modifiers?: Modifiers;
  tooltipWrapper: React.ReactNode;
  tooltipWrapperProps?: any;
  tooltipArrowClassName?: string;
  childrenWrapperElement?: 'div' | 'span' | 'img';
  childrenProps?: any;
  children?: React.ReactNode;
  disabled?: boolean
}

const Tooltip: React.FC<TooltipProps> = observer(
  ({
    placement,
    tooltipShown,
    trigger = 'click',
    modifiers,
    children,
    tooltipWrapper,
    tooltipWrapperProps,
    tooltipArrowClassName,
    childrenWrapperElement = 'span',
    childrenProps,
    disabled
  }) => (
    <TooltipTrigger
      trigger={trigger}
      placement={placement}
      tooltipShown={tooltipShown}
      modifiers={modifiers}
      tooltip={({
        arrowRef,
        tooltipRef,
        getArrowProps,
        getTooltipProps,
        placement
      }) => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            ...tooltipWrapperProps
          })}
        >
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow ' + (tooltipArrowClassName || ''),
              'data-placement': placement
            })}
          />
          {tooltipWrapper}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) => {
        const Tag = childrenWrapperElement;

        return disabled ?
          (<Spin/>) : (<Tag
            {...getTriggerProps({
              ref: triggerRef,
              ...childrenProps
            })}
          >
            {children}
          </Tag>)
      }}
    </TooltipTrigger>
  )
);

export default Tooltip;
