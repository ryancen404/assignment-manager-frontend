import { Descriptions } from "antd";
import { useContext } from "react";
import { InfoContext } from "..";
import { InfoContextType } from "../type";

const InfoHeaderContent = () => {
  const context = useContext<InfoContextType>(InfoContext)
  
  return (
    <Descriptions size="middle" column={4}>
      <Descriptions.Item label="班级">{"班级"}</Descriptions.Item>
    </Descriptions>
  )
}

export default InfoHeaderContent;