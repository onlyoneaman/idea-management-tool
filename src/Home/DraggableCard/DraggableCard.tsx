import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Idea from "../../Common/Models/Idea";
import {Button, Form, Input} from "antd";
import {
  EditOutlined, CheckOutlined, DeleteOutlined
} from '@ant-design/icons'
import {useState} from "react";

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
  updateIdea: Function
}

const defaultDeltaPositions: DraggableCardProps["deltaPosition"] = {x: 0, y: 0}
const defaultCurrPositions: DraggableCardProps["currPosition"] = {x: -400, y: -200}

const DraggableCard = (
    {
        deltaPosition = defaultDeltaPositions,
        currPosition = defaultCurrPositions,
        item,
        updateIdea
    }: DraggableCardProps
) => {
  const [editItem, setEditItem] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const onStart = () => {
  };

  const onStop = () => {
  };

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const {x, y} = item.position;
    updateIdea(item.id, {
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
  };

  const dragHandlers = {onStart: onStart, onStop: onStop}

  return (
      <div
        onMouseEnter={e => setShowEdit(true)}
        onMouseLeave={e => setShowEdit(false)}
      >
        <Draggable
/*            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={undefined}
            grid={[25, 25]}*/
            scale={1}
            onDrag={(e, ui) => handleDrag(e, ui)}
            {...dragHandlers}
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
              <Button
                icon={<DeleteOutlined />}
                type={'text'}
                danger
              />
            </div>
            {
              editItem ? (
                  <Form
                    initialValues={{
                      description: item.description
                    }}
                    hideRequiredMark
                  >
                    <Form.Item
                      name={"description"}
                      required
                    >
                      <Input.TextArea
                        autoSize
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => (
                          <Button.Group>
                            <Button
                                icon={<CheckOutlined />}
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
                  <div
                      style={{
                        paddingTop: "20px"
                      }}
                  >
                    {item.description}
                  </div>
              )
            }
          </div>
        </Draggable>
      </div>
  )
}

export default DraggableCard