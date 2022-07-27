import React from "react";
import { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { BiCopy } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'

const Receive = (props) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const url = imageUrlBuilder(client).image(props.selectedToken.logo).url();
    setImageUrl(url)
  }, [props.selectedToken])

  return (
    <div className="WrapperReceive">
      <div className="ContentReceive">
        <div className="QRCOintainerReceive">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${props.address}`}
          />
        </div>
        <div className="DividerReceive" />
        <div className="RowReceive">
          <div className="CoinSelectList" onClick={() => props.setAction('select')}>
            <div className="IconReceive">
              <img src={imageUrl} alt='' />
            </div>
            <div className="CoinNameReceive">{props.selectedToken.name}</div>
          </div>
        </div>
        <div className="DividerReceive" />
        <div className="RowReceive">
          <div>
            <div className="TitleReceive">{props.selectedToken.symbol} Address</div>
            <div className="AddressReceive">{props.selectedToken.contractaddress}</div>
          </div>
          <div className="CopyButton"
            onClick={() => {
              navigator.clipboard.writeText(props.selectedToken.contractaddress)
              setCopied(true)
            }}
          >
            {copied ? <FaCheck style={{ color: '#27ad75' }} /> : <BiCopy />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receive;