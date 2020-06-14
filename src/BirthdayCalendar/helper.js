export const sort_date = (user1, user2) => {
  return new Date(user2.birthday).getTime() - new Date(user1.birthday).getTime();
}