import React from 'react';
import { Result, Button } from 'antd';
import { useLocation } from 'wouter'

export default function Index() {
    const [path, setLocation] = useLocation()
    return (
        <div className='query_list_container graphData_wrapper'>
            <Result
                status="404"
                title="404"
                subTitle="暂无此页面，请确定页面地址正确。"
                extra={
                    <Button
                        type="primary"
                        onClick={() => setLocation("/")}>
                        返回首页
                    </Button>
                }
            />
        </div>
    );
}
