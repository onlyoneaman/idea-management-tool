import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Idea from "../../Common/Models/Idea";
import {Button, Form, Input, Popconfirm, Select, Tag} from "antd";
import {
  EditOutlined, CheckOutlined, DeleteOutlined
} from '@ant-design/icons'
import {useEffect, useState} from "react";
import Bucket from "../../Common/Models/Bucket";

type DraggableCardProps = {
  deltaPosition?: {
    x: number,
    y: number
  },
  currPosition?: {
    x: number,
    y: number
  },
  item: Idea,
  updateIdeaPosition: Function,
  edit?: boolean,
  updateIdeaDesc: Function,
  removeIdea: Function,
  buckets: Bucket[],
  pro?: any,
  grouped: boolean
}

const defaultDeltaPositions: DraggableCardProps["deltaPosition"] = {x: 0, y: 0}
const defaultCurrPositions: DraggableCardProps["currPosition"] = {x: -400, y: -200}

const DraggableCard = (
    {
        deltaPosition = defaultDeltaPositions,
        currPosition = defaultCurrPositions,
        item,
        updateIdeaPosition,
        updateIdeaDesc,
        removeIdea,
        buckets,
        pro,
        grouped
    }: DraggableCardProps,
) => {
  const [editItem, setEditItem] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [itemForm] = Form.useForm()

  const onStart = (e: DraggableEvent, ui: DraggableData) => {
    const {x, y} = item.position;
    console.log("start", x + ui.x, y + ui.y)
  };

  const onStop = (e: DraggableEvent, ui: DraggableData) => {
    const {x, y} = item.position;
    console.log("stop", x + ui.x, y + ui.y)
    updateIdeaPosition(item.id, {
      x: x + ui.x, y: y + ui.y
    })
  };

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const {x, y} = item.position;
/*    updateIdeaPosition(item.id, {
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })*/
  };

  const onUpdateDescription = (values: any) => {
    updateIdeaDesc(item.id, values.description, values.group_id)
    setEditItem(false)
  }

  const dragHandlers = {onStart: onStart, onStop: onStop}

  const getTag = () => {
    const b = buckets.filter(b => b.id === item.bucket_id);
    return b.length > 0 ? (
        <div
            className={"tag is-normal"}
        >
          {b[0].title}
        </div>) : null
  }

  useEffect(() => {
    console.log(item.id, item.position.x, item.position.y)
  }, [])

  return (
      <div
        onMouseEnter={e => setShowEdit(true)}
        onMouseLeave={e => setShowEdit(false)}
        key={item.id}
        style={grouped ? {} : {
          position: 'absolute',
          top: item.position.y,
          left: item.position.x,
          zIndex: 1000
        }}
      >
        <Draggable
/*            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={undefined}
            grid={[25, 25]}*/
            scale={1}
            disabled={editItem}
            key={item.id}
            onDrag={(e, ui) => handleDrag(e, ui)}
            {...dragHandlers}
            {...pro}
        >
          <div
              className={"box"}
              style={{
                backgroundColor: item.color
              }}
          >
            <div
              style={{
                position: 'absolute',
                top: "10px",
                right: "10px"
              }}
              hidden={!showEdit}
            >
              <Button
                  onClick={() => setEditItem(true)}
                  icon={<EditOutlined />}
                  type={'text'}
              />
              <Popconfirm
                  title={"Are you sure you want to delete this item?"}
                  onConfirm={() => removeIdea(item.id)}
              >
                <Button
                    icon={<DeleteOutlined />}
                    type={'text'}
                    danger
                />
              </Popconfirm>
            </div>
            {
              editItem ? (
                  <Form
                    initialValues={{
                      description: item.description,
                      group_id: item.bucket_id
                    }}
                    onFinish={onUpdateDescription}
                    hideRequiredMark
                    form={itemForm}
                  >
                    <Form.Item
                      name={"group_id"}
                      className={"mb-1"}
                    >
                      <Select
                          placeholder={"Add to Bucket"}
                      >
                        <Select.Option
                          key={11111111111111111}
                          value={null}
                          title={null}
                        >
                          None
                        </Select.Option>
                        {buckets.map((b) => (
                            <Select.Option
                                key={b.id}
                                value={b.id}
                                title={b.title}
                            >
                              {b.title}
                            </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={"description"}
                      required
                    >
                      <Input.TextArea
                        autoSize
/*                        onPressEnter={() => itemForm.submit()}*/
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => (
                          <Button.Group>
                            <Button
                                icon={<CheckOutlined />}
                                htmlType={'submit'}
                            />
                            <Button
                              onClick={() => setEditItem(false)}
                            >
                              Cancel
                            </Button>
                          </Button.Group>
                      )}
                    </Form.Item>
                  </Form>
              ) : (
                  <div>
                    {!grouped && getTag()}
                    <p
                      style={{
                        paddingTop: "21px",
                        fontSize: '0.8rem'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
              )
            }
          </div>
        </Draggable>
      </div>
  )
}

export default DraggableCard