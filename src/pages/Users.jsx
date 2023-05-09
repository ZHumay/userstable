import { Layout } from "../components/Layout";
import { Row, Col,Table,Spinner } from "reactstrap";
import axios  from "axios";
import { UserData } from "../components/UsersData";
import { useEffect, useState } from "react";

export const Users = () => {
     let initialState = {
    data: undefined,
    error: undefined,
    loading: true,
  };
  const [datas, setDatas] = useState(initialState);
  useEffect(() => {
    setDatas((oldData) => ({
      ...oldData,
      loading: true,
      error: undefined,
      data: undefined,
    }));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        setDatas((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setDatas({ data: undefined, loading: false, error: err.toString() });
      });
  }, []);
  return (
    <Layout>
      <Row>
        <Col>
        <div>
      {datas.error && <h5 color="red">Error occured ....</h5>}
      {datas.loading && <Spinner />}
      {datas.data && (
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>companyName</th>
            </tr>
          </thead>
          <tbody>
            {datas.data &&
                <UserData data={datas.data} />
            }
          </tbody>
        </Table>
      )}
    </div>
        </Col>
      </Row>
    </Layout>
  );
};