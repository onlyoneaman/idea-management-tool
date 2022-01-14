import Bucket from "../../Common/Models/Bucket";
import {Button, Modal, Table} from "antd";
import AddBucket from "./AddBucket";
import {useState} from "react";

type BucketsProps = {
  buckets: Bucket[],
  vis: boolean,
  cancel: Function,
  update: Function
}

const Buckets = (
    {
        buckets,
        vis,
        cancel,
        update
    }: BucketsProps
) => {
  const [ad, setAd] = useState(false)

  const bucketColumns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id"
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "title"
    }
  ]

  const newBucket = (values: any) => {
    update()
  }

  return (
      <Modal
        visible={vis}
        onCancel={() => cancel()}
        footer={null}
        centered
        title={"Buckets"}
        width={800}
      >
        <AddBucket
            update={(t: string) => update(t)}
            vis={ad}
            cancel={() => setAd(false)}
        />
        <Button
          onClick={() => setAd(true)}
        >
          Add New Bucket
        </Button>
        <Table
          columns={bucketColumns}
          dataSource={buckets}
        />
      </Modal>
  )
}

export default Buckets