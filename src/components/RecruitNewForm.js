import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, notification, Select } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import Axios from "axios";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import { useHistory } from "react-router";

export default function PostNewForm() {
  const { Option } = Select;
  const {
    store: { jwtToken },
  } = useAppContext();

  const history = useHistory();

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleUploacChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const handleFinish = async (fieldValues) => {
    const {
      product,
      location,
      celler,
      platform,
      photo: { fileList },
    } = fieldValues;

    const formData = new FormData();
    formData.append("product", product);
    formData.append("location", location);
    formData.append("celler", celler);
    formData.append("platform", platform);

    fileList.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });

    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await Axios.post(
        "http://127.0.0.1:8000/api/posts/",
        formData,
        {
          headers,
        }
      );
      console.log("success response :", response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
      <Form.Item
        label="Product"
        name="product"
        rules={[{ required: true, message: "상품명을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.product}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "상세 위치를 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.location}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="celler"
        name="celler"
        rules={[{ required: true, message: "상호명을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.celler}
        {...fieldErrors.non_field_errors}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Select"
        label="Platform"
        name="platform"
        rules={[{ required: true, message: "플랫폼을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.platform}
        {...fieldErrors.non_field_errors}
      >
        <Select>
          <Select.Option value="네이버스토어">네이버스토어</Select.Option>
          <Select.Option value="쿠팡">쿠팡</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploacChange}
          onPreview={handlePreviewPhoto}
        >
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Modal
        visible={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>

      <hr />
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
