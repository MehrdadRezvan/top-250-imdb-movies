import { ConfigProvider } from 'antd';

export default function AntdConfig({children}) {
  return(
    <ConfigProvider theme={{
      token:{
        colorPrimary : "#deb522",
        colorText: "#fff",
        colorBgContainer: "rgba(106, 127, 140, 0.3)",
        colorTextPlaceholder: "rgba(106, 127, 140, 0.2)",
        colorTextDisabled: "#fff"
    }, components:{
        Pagination:{
          itemActiveBg: "rgba(106, 127, 140, 0.3)",
          itemBg: "rgba(106, 127, 140, 0.2)",
          itemActiveColorDisabled: "#fff"
        },
        Button:{
          defaultBg: "none",
          defaultColor: "#deb522",
          defaultHoverBg: "#deb522",
          defaultHoverColor: "#000",
          primaryColor: "#000"
        },
        Card:{
          headerBg: "rgba(106, 127, 140, 0.3)"
        }
        }}}>
      {children}      
    </ConfigProvider>
  )
}