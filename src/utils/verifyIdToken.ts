import { UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

/**
 * Firebaseのトークンチェック
 */
export const verifyIdToken = async (headers) => {
  const bearerToken = await headers.authorization;

  if (!bearerToken) {
    throw new UnauthorizedException();
  }

  const idToken = await bearerToken!.replace('Bearer ', '');
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  return decodedToken;
};
