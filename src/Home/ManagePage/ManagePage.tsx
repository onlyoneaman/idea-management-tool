import { Touch, Canvas } from 'react-touch-canvas'
import Draggable from 'react-draggable';
import {useEffect, useState} from "react";
import Idea from "../../Common/Models/Idea";
import DraggableCard from "../DraggableCard/DraggableCard";
import {Button, Layout} from "antd";
import ContentWrapper from "../../components/ContentWrapper";
import {PlusCircleOutlined} from '@ant-design/icons'

const cardColors = [
    "#f8dd80", "#86cefc", "#e0a7f9",
  "#89f3a7", "#f28384"
]

const ManagePage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([])

  const eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  const style = { width: '800px', border: '1px solid red' }

  const updatePositionItem = (id: number, pos: Idea["position"]) => {
    let its = [...ideas]
/*    let item = its.filter(a => a.id === id)[0]
    item.position = pos*/
    for (let i = 0; i < its.length ; i++) {
      if(its[i].id === id) {
        its[i].position = pos
      }
    }
    setIdeas(its)
  }

  useEffect(() => {
    setIdeas([{
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor eros, rutrum a viverra vel, cursus eget eros. Nulla facilisi. Ph",
      id: 1,
      position: {
        x: 0,
        y: 0
      },
      color: cardColors[0]
    }])
  }, [])

  useEffect(() => {
    if(ideas.length > 0) {
/*      console.log(ideas[0].position)*/
    }
  }, [ideas])

  return (
      <Layout
        className={"my-4"}
      >
        <ContentWrapper>
          <Button
              onClick={(e) => null}
              type={'text'}
          >
            <PlusCircleOutlined />
          </Button>
          <div>
            <div>
              {ideas.map((i) => (
                  <DraggableCard
                      item={i}
                      updateIdea={updatePositionItem}
                  />
              ))}
            </div>
          </div>
        </ContentWrapper>
      </Layout>
  )

/*  return (
      <div style={style}>
        <Touch>
          <Canvas
              width={800}
              height={600}
              onAnimationFrame={(ctx, time) => {
                ctx.font = '30px Arial'
                ctx.fillText(`time: ${Math.round(time)}`, 25, 50)
              }}
              getContext={(ctx => ctx)}
          >
          </Canvas>
        </Touch>
      </div>
  )*/
}

export default ManagePage