import { gql } from '@apollo/client';

/**
 * Licenses
 */
export const CREATE_LICENSE = gql`
  mutation CreateLicense($startDate: Time, $accountId: String!, $role: String!, $application: String!, $count: Int!) {
    createLicense(license: { startDate: $startDate, accountId: $accountId, role: $role, application: $application, count: $count }) {
      uid
      role
      startDate
      endDate
      assignedTo
    }
  }
`;

export const NEW_LICENSE = gql`
  fragment NewLicense on License {
    uid
    role
    startDate
    endDate
    assignedTo
  }
`;

export const LICENSES = gql`
  query Licenses($accountId: String!) {
    licenses(accountId: $accountId) {
      uid
      role
      application
      startDate
      endDate
      assignedTo
    }
  }
`;

/**
 * Members
 */
export const MEMBERS = gql`
  query Members {
    members {
      uid
      displayName
      email
      createdAt
      licenses {
        role
        endDate
      }
      accountId
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $uid: String!
    $accountId: String!
    $displayName: String
    $email: String
    $password: String
    $phoneNumber: String
    $licenseId: String
    $emailVerified: Boolean
    $disabled: Boolean
  ) {
    updateMember(
      member: {
        uid: $uid
        accountId: $accountId
        displayName: $displayName
        email: $email
        password: $password
        phoneNumber: $phoneNumber
        licenseId: $licenseId
        emailVerified: $emailVerified
        disabled: $disabled
      }
    )
  }
`;

export const CREATE_MEMBER = gql`
  mutation CreateMember($accountId: String!, $displayName: String!, $email: String!, $phoneNumber: String!, $licenseId: String!) {
    createMember(
      member: { accountId: $accountId, displayName: $displayName, email: $email, phoneNumber: $phoneNumber, licenseId: $licenseId }
    ) {
      password
      email
    }
  }
`;

export const RESET_MEMBER_PASSWORD = gql`
  mutation ResetPassword($uid: String!) {
    resetPassword(uid: $uid) {
      password
      email
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation DeleteMember($uid: String!) {
    removeMember(uid: $uid)
  }
`;

export const MEMBER = gql`
  query Member($uid: String!) {
    member(uid: $uid) {
      uid
      displayName
      email
      createdAt
      lastLogin
      licenses {
        role
        application
        endDate
      }
      accountId
    }
  }
`;
