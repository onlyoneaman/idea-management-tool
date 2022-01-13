import {BounceLoader, ClipLoader, DotLoader, PacmanLoader, ScaleLoader} from "react-spinners";

type LoaderProps = {
  fullScreen?: boolean,
  loaderSize?: 'large' | 'small' | 'default',
  iconColor?: string,
  LoaderIcon?: any
}

const Loader = (
    {
        fullScreen,
        loaderSize = 'default',
        iconColor = "rgb(24, 144, 255)",
    }: LoaderProps
) => {

  const iconProps = {
    color: iconColor
  }

  return (
      <div className={`hero ${fullScreen ? 'is-fullheight' : ''}`}>
        <div className={'hero-body'}>
          <div className={'container has-text-centered'}>
            <div className={'title'}>
{/*              <Spin
                size={loaderSize}
              />*/}
              <PacmanLoader
                color={iconColor}
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Loader