import {Button, Form, Input, Modal} from "antd";

type AddBucketProps = {
  vis: boolean,
  update: Function,
  cancel: Function
}

const AddBucket = (
    {
        vis,
        cancel,
        update
    }: AddBucketProps
) => {

  const submit = (v: any) => {
    update(v.title)
  }

  return (
      <Modal
        title={"Add Bucket"}
        visible={vis}
        footer={null}
        centered
        onCancel={() => cancel()}
      >
        <Form
          onFinish={submit}
          hideRequiredMark
        >
          <Form.Item
            noStyle
          >
            Title
            <Form.Item
              name={"title"}
              required
            >
              <Input
                placeholder={"Enter Bucket Name Here"}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            shouldUpdate
          >
            {() => (
                <Button
                  htmlType={"submit"}
                  type={'primary'}
                >
                  Save
                </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default AddBucket