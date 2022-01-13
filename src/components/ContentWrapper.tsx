import {Layout} from "antd";
import React from "react";

const {Content} = Layout

type ContentWrapperProps = {
  children: React.ReactNode,
  marginLess?: boolean,
  style?: React.CSSProperties,
  addToClassName?: string,
  whiteBg?: boolean
}

const ContentWrapper = (
    {
      children,
        marginLess,
        style,
        addToClassName,
        whiteBg = false
    }
: ContentWrapperProps) => {
  return (
      <Content
        style={style}
        className={`content-layout-background has-background-white ${addToClassName}`}
      >
        {children}
      </Content>
  )
}

export default ContentWrapper