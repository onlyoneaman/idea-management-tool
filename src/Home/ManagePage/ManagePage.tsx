import { Touch, Canvas } from 'react-touch-canvas'
import Draggable from 'react-draggable';
import {useEffect, useState} from "react";
import Idea from "../../Common/Models/Idea";
import DraggableCard from "../DraggableCard/DraggableCard";
import {Button, Divider, Layout, Radio, Typography} from "antd";
import ContentWrapper from "../../components/ContentWrapper";
import {PlusCircleOutlined} from '@ant-design/icons'
import {randomUUID} from "crypto";
import idea from "../../Common/Models/Idea";
import Bucket from "../../Common/Models/Bucket";
import LoadModal from "../../components/LoadModal";
import Buckets from "../Buckets/Buckets";
import GetIdeasApi from "../../Common/ApiCall/Ideas/GetIdeasApi";
import {BadNotif, SuccessNotif} from "../../Common/Utils/SendNotification";
import GetBucketApi from "../../Common/ApiCall/Buckets/GetBucketApi";
import CreateBucketApi from "../../Common/ApiCall/Buckets/CreateBucketApi";
import DeleteIdeaApi from "../../Common/ApiCall/Ideas/DeleteIdeaApi";
import CreateIdeaApi from "../../Common/ApiCall/Ideas/CreateIdeaApi";
import UpdateIdeaApi from "../../Common/ApiCall/Ideas/UpdateIdeaApi";
import UpdateIdeaPositionApi from "../../Common/ApiCall/Ideas/UpdateIdeaPositionApi";

const {Header} = Layout
const {Title} = Typography

const cardColors = [
    "#f8dd80", "#86cefc", "#e0a7f9",
  "#89f3a7", "#f28384"
]

export const Views = [
  {
    value: 1,
    title: "Standard"
  },
  {
    value: 2,
    title: "Sorted"
  },
  {
    value: 3,
    title: "Group Highlights"
  }
]

const DEFAULT_MODE = 2

const ManagePage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [buckets, setBuckets] = useState<Bucket[]>([])
  const [newItem, setNewItem] = useState<number | null>(null)
  const [shBucks, setShBucks] = useState(false)
  const [mode, setMode] = useState<number>(DEFAULT_MODE)
  const [load, setLoad] = useState(true)

  const eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  const style = { width: '800px', border: '1px solid red' }

  const updatePositionItem = async (id: number, pos: Idea["position"]) => {
/*    let its = [...ideas]
/!*    let item = its.filter(a => a.id === id)[0]
    item.position = pos*!/
    for (let i = 0; i < its.length ; i++) {
      if(its[i].id === id) {
        its[i].position = pos
      }
    }
    setIdeas(its)*/
    const res = await UpdateIdeaPositionApi(id, pos)
    if(res.success) {
    } else {
      BadNotif(res)
    }
  }

  const updateItemDescription = async (id: Idea["id"], desc: Idea["description"], group_id: Idea["bucket_id"]) => {
/*    let its = [...ideas]
    for (let i = 0; i < its.length ; i++) {
      if(its[i].id === id) {
        its[i].description = desc
        its[i].bucketId = group_id
      }
    }
    setIdeas(its)*/
    setLoad(true)
    const res = await UpdateIdeaApi(desc, group_id, id)
    if(res.success) {
      refresh()
    } else {
      BadNotif(res)
    }
    setLoad(false)
  }

  const addNewItem = async () => {
    let ii = ideas.length+1
    const editingItem: Idea = {
      description: "Enter Description here",
      position: {
        x: 100,
        y: 100
      },
      id: ii,
      color: cardColors[ii%cardColors.length]
    }
    setLoad(true)
    const res = await CreateIdeaApi(editingItem.description, null, editingItem.color)
    if(res.success) {
      SuccessNotif("Idea Created")
      getIdeas()
    } else {
      BadNotif(res)
    }
    setLoad(false)
/*    setNewItem(ii)
    setIdeas([editingItem, ...ideas])*/
  }

  const removeItem = async (id: Idea["id"]) => {
    setLoad(true)
    const res = await DeleteIdeaApi(id)
    if(res.success) {
      SuccessNotif("Idea Removed")
      refresh()
    } else {
      BadNotif(res)
    }
    setLoad(false)
  }

  useEffect(() => {
/*    setIdeas([{
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor eros, rutrum a viverra vel, cursus eget eros. Nulla facilisi. Ph",
      id: 1,
      position: {
        x: 0,
        y: 0
      },
      color: cardColors[0]
    }])
    setBuckets([
      {
        id: 1,
        title: "Risk"
      },
      {
        id: 2,
        title: "Services"
      }
    ])*/
  }, [])

  async function addBucket(t: string) {
    setLoad(true)
    const res = await CreateBucketApi(t)
    if(res.success) {
      SuccessNotif("Bucket Created")
      getBuckets()
    } else {
      BadNotif(res)
    }
    setLoad(false)
  }

  async function getIdeas() {
    setLoad(true)
    const res = await GetIdeasApi()
    if(res.success) {
      setIdeas(res.data.items)
    } else {
      BadNotif(res)
    }
    setLoad(false)
  }

  async function getBuckets() {
    setLoad(true)
    const res = await GetBucketApi()
    if(res.success) {
      setBuckets(res.data.items)
    } else {
      BadNotif(res)
    }
    setLoad(false)
  }

  function boxDropped(pos: any) {
    buckets.map((b) => {
      const a = document.getElementById(`bucket-${b.id}`)
      if(a) {
        let [w, h, t, l] = [a.offsetWidth, a.offsetHeight, a.offsetTop, a.offsetLeft]
        console.log(l, w, t, h)
      }
    })
  }

  function refresh() {
    getIdeas()
    getBuckets()
  }

  useEffect(() => refresh(), [])

  return (
      <Layout
        className={"my-4 has-background-white"}
      >
        <LoadModal load={load} />
        <Buckets
            buckets={buckets}
            vis={shBucks}
            cancel={()=>setShBucks(false)}
            update={addBucket}
        />
        <Header
          className={"has-background-white mr-6"}
        >
          <Typography.Title
            style={{
              display: 'inline-block'
            }}
          >
            Idea Mapping
          </Typography.Title>
          <Radio.Group
            className={"is-pulled-right"}
            value={mode}
            onChange={e => setMode(e.target.value)}
          >
            {Views.map((v) => (
                <Radio.Button
                  value={v.value}
                  key={v.value}
                >
                  {v.title}
                </Radio.Button>
            ))}
          </Radio.Group>
          <Divider />
          {
            mode !== 3 && (
                  <Button
                      onClick={(e) => addNewItem()}
                      icon={<PlusCircleOutlined />}
                      title={"Add Idea"}
                      className={"is-pulled-right"}
                  >
                    Add Idea
                  </Button>
              )
          }
          <Button
              title={"Add Bucket"}
              className={"is-pulled-right"}
              onClick={() => setShBucks(true)}
          >
            Buckets
          </Button>
        </Header>
        <ContentWrapper
          addToClassName={"mt-6"}
        >
          <div>
            {
              mode !== 3 ? (
                  <div>
                    {ideas.map((i) => (
                        <DraggableCard
                            item={i}
                            key={i.id}
                            updateIdeaPosition={updatePositionItem}
                            updateIdeaDesc={updateItemDescription}
                            edit={i.id === newItem}
                            removeIdea={removeItem}
                            buckets={buckets}
                            grouped={false}
                            mode={mode}
                        />
                    ))}
                  </div>
              ) : (
                  <div>
                    {buckets.map((b) => (
                        <div
                            className={"box bucket-box"}
                            style={{
                            }}
/*                            onDragLeaveCapture={e => {
                              e.preventDefault()
                              console.log(e)
                            }}*/
                            key={b.id}
                            id={`bucket-${b.id}`}
                        >
                          <h3 className={"heading has-text-centered has-text-weight-bold is-size-4"}>
                            {b.title}
                          </h3>
                          {b.ideas.map((i) => (
                              <DraggableCard
                                  item={i}
                                  key={i.id}
                                  updateIdeaPosition={updatePositionItem}
                                  updateIdeaDesc={updateItemDescription}
                                  edit={i.id === newItem}
                                  removeIdea={removeItem}
                                  buckets={buckets}
                                  mode={mode}
                                  dropped={boxDropped}
                              />
                          ))}
                        </div>
                    ))}
                    <div className={"mx-5 px-5"}>
                      <h3 className={"heading has-text-weight-bold is-size-4"}>
                        Ungrouped
                      </h3>
                      {ideas.filter(i => i.bucket_id === null).map((i) => (
                          <DraggableCard
                              item={i}
                              key={i.id}
                              updateIdeaPosition={updatePositionItem}
                              updateIdeaDesc={updateItemDescription}
                              edit={i.id === newItem}
                              removeIdea={removeItem}
                              buckets={buckets}
                              mode={mode}
                              dropped={boxDropped}
                          />
                      ))}
                    </div>
                  </div>
              )
            }
          </div>
        </ContentWrapper>
      </Layout>
  )
}

export default ManagePage