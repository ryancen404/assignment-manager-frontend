import { Descriptions } from "antd";
import { useContext } from "react";
import { InfoContext, InfoContextType } from "..";

const InfoHeaderContent = () => {
  const context = useContext<InfoContextType>(InfoContext)
  
  return (
    <Descriptions size="middle" column={4}>
      <Descriptions.Item label="班级">{"班级"}</Descriptions.Item>
    </Descriptions>
  )
}

export default InfoHeaderContent;