import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Feed() {
  const [user_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };

  setConstraint(true);

  useEffect(() => {
    Axios({
      url: "http://localhost:5000/getitem",
      method: "GET",
    })
      .then((response) => {
        console.log("getitem responses", response.data.postitems);

        let data = response.data.postitems;
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();

          if (item.type === "Lost" && item.status === true) {
            let user = item.createdBy === user_info._id;

            items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                key={item.name}
              >
                <Col style={{ marginTop: "2%", paddingRight: "40px" }} md={3}>
                  <Card bsPrefix="item-card">
                    {item.itemPictures && item.itemPictures[0] && item.itemPictures[0].contentType &&
                      <Card.Img
                        variant="top"
                        src={`data:${item.itemPictures[0].contentType};base64,${item.itemPictures[0].data}`}
                      />
                    }
                    <Card.Body bsPrefix="card-body">
                      <Card.Title style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: "1.35rem", color: "blue" }}>
                        Item: {item.name}
                      </Card.Title>
                      {item.description && (
                        <Card.Text style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "1rem" }}>
                          Description: <ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      )}
                      <Card.Text style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "1rem" }}>
                        Created at: {createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </a>
            );
          } else {
            let user1 = item.createdBy === user_info._id;

            Found_items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
                key={item.name}
              >
                <Col style={{ marginTop: "20px", paddingRight: "40px" }} md={3}>
                  <Card bsPrefix="item-card">
                    {item.itemPictures && item.itemPictures[0] && item.itemPictures[0].contentType &&
                      <Card.Img
                        variant="top"
                        src={`data:${item.itemPictures[0].contentType};base64,${item.itemPictures[0].data}`}
                      />
                    }
                    <Card.Body bsPrefix="card-body">
                      <Card.Title style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: "1.35rem", color: "blue" }}>
                        Item: {item.name}
                      </Card.Title>
                      {item.description && (
                        <Card.Text style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "1rem" }}>
                          Description: <ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      )}
                      <Card.Text style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "1rem" }}>
                        Created at: {createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </a>
            );
          }
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  const [item, setitem] = useState([]);
  const [Found_item, setFound_item] = useState([]);

  return (
    <div>
      <div>
        <Navbar />
        <h2
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            backgroundColor: "#fff",
            color: "#000",
            textAlign: "center",
          }}
        >
          Welcome {user_info.firstname} 👋!
        </h2>
      </div>
      <div style={{ backgroundColor: "#71C9CE" }}>
        <Container fluid style={{ backgroundColor: "'#71C9CE'" }}>
          <h2 style={{ textAlign: "center", color: "#fff" }}>Lost items :</h2>
          <div className="title-border"></div>
          <Row>{item}</Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#71C9CE" }}>
        <Container fluid>
          {Found_item.length > 0 && (
            <div>
              <h2 style={{ textAlign: "center", color: "#fff" }}>Found items :</h2>
              <div className="title-border"></div>
              <Row>{Found_item}</Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
