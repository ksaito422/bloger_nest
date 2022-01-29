import * as admin from 'firebase-admin';

/**
 * Firebaseのユーザ削除
 */
export const deleteUser = async (uid: string) => {
  await admin.auth().deleteUser(uid);
};
