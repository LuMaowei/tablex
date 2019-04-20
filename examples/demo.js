import React from "react";
import Table from "./index";

export default ()=>{

    return  <Table
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          width: 200
        },
        {
          title: "Age",
          dataIndex: "age",
          width: 200
        },
        {
          title: "Address",
          children: [
            {
              title: "公司地址",
              dataIndex: "address1",
              width: 200
            },
            {
              title: "家庭地址",
              dataIndex: "address2",
              width: 200,
              children: [
                {
                  title: "家庭地址1",
                  dataIndex: "address3",
                  width: 200
                },
                {
                  title: "家庭地址2",
                  dataIndex: "address4",
                  width: 200
                }
              ]
            }
          ]
        }
      ]}
      dataSource={(() => {
        let data = [];
        for (let i = 0; i < 46; i++) {
          data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address1: `London, Park Lane no. ${i}`,
            address2: `London, Park Lane no. ${i}`,
            address3: `London, Park Lane no. ${i}`,
            address4: `London, Park Lane no. ${i}`
          });
         
        }
         return data;
      })()}
    />
}