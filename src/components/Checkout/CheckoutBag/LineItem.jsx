import React from "react";
import { Col } from "reactstrap";
import QuantityEditor from "../../commons/QuantityEditor";
import { replaceStaticUrl } from "./../../../utils/";
import {
  OrderLine,
  ImgContainer,
  LinePrice,
  NameContainer,
  ActionsContainer
} from "./styles";

const LineItem = ({
  id,
  quantity,
  localized,
  variantId,
  isDigital,
  sku,
  productId,
  name,
  images,
  thumbnailUrl,
  modifyQuantity,
  deleteLineItem,
  push
}) => {
  return (
    <div>
      {quantity > 0 && (
        <OrderLine key={sku} className="row py-3 mx-auto">
          <Col xs="4" lg="3" className={images.length === 0 ? "d-none" : "pl-0"}>
            <ImgContainer
              onClick={() => push(`/product/${productId}`)}
            >
              <img
                alt=""
                className="img-fluid"
                src={replaceStaticUrl(
                  images && images.length > 0 ? images[0].url : ""
                )}
              />
            </ImgContainer>
          </Col>
          <Col
            xs={images.length === 0 ? "12" : "8"}
            lg="9"
            className="d-flex flex-column justify-content-between"
          >
            <NameContainer className="row mb-3">
              <div className="name-placeholder">
                <div
                  className="main-name mb-2"
                  onClick={() => push(`/product/${productId}`)}
                >
                  {name}
                </div>
              </div>
              <div className="sub-heading">
                <span>Type: </span>
                <span>
                  {isDigital ? <span>Digital</span> : <span>Print</span>}
                </span>
              </div>
            </NameContainer>
            <ActionsContainer className="row">
              <div className="col-6 px-0">
                <LinePrice className="mb-3">
                  <span className="price">{localized}</span>
                </LinePrice>

                {quantity > 0 && (
                  <span
                    className="delete-item"
                    onClick={e => deleteLineItem(id)}
                  >
                    REMOVE
                  </span>
                )}
              </div>
              {!isDigital && (
                <div className="col-6 col-lg-3 offset-lg-3 px-0 d-flex flex-column justify-content-end align-items-end">
                  <QuantityEditor
                    quantity={quantity}
                    modifyQuantity={modifyQuantity(id ? id : variantId)}
                  />
                </div>
              )}
            </ActionsContainer>
          </Col>
          <hr />
        </OrderLine>
      )}
    </div>
  );
};

export default LineItem;
