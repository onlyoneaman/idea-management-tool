import {Modal} from "antd";
import {DotLoader, FadeLoader} from "react-spinners";

type LoadModalProps = {
  load: boolean
}

const LoadModal = (
    {
        load
    }: LoadModalProps
) => {

  return (
      <Modal
        visible={load}
        footer={null}
        closable={false}
        width={900}
        centered
        zIndex={100000}
        modalRender={() => (
            <div
                className={"hero is-halfheight m-0 is-transparent"}
            >
              <div className={"hero-body"}>
                <div className={"container has-text-centered"}>
                  <div className={"title"}>
                    <FadeLoader
                        color={"white" ?? "rgb(24, 144, 255)"}
                    />
                  </div>
                </div>
              </div>
            </div>
        )}
      />
  )
}

export default LoadModal