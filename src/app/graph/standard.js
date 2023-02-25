import { gql } from '@apollo/client';

/**
 * Standards
 */
export const STANDARDS = gql`
  query Standards {
    standards {
      id
      name
      version
      fields
      controls
      createdAt
    }
  }
`;

export const CREATE_STANDARD = gql`
  mutation CreateStandard($name: String!, $fields: [JSON!]!) {
    newStandard(data: { fields: $fields, name: $name }) {
      id
      name
      version
      fields
      controls
      createdAt
    }
  }
`;

export const DELETE_STANDARD = gql`
  mutation DeleteStandard($id: String!) {
    deleteStandard(id: $id)
  }
`;

export const UPDATE_STANDARD = gql`
  mutation UpdateStandard($id: String!, $name: String!, $fields: [JSON], $controls: [JSON]) {
    updateStandard(id: $id, data: { name: $name, fields: $fields, controls: $controls }) {
      name
      version
      fields
      controls
    }
  }
`;

/**
 * Controls
 */
export const CONTROLS = gql`
  query Controls($standardId: String!) {
    controls(standardId: $standardId) {
      name
      version
      fields
      controls
      createdAt
    }
  }
`;

export const UPLOAD_CONTROLS = gql`
  mutation UploadControls($standardId: String!, $bucket: String!, $file: String!) {
    uploadControls(standardId: $standardId, bucket: $bucket, file: $file)
  }
`;
