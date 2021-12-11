import { showMessage } from 'react-native-flash-message';
import { ThemeStatic } from '@app/theme';

export const welcomeNotification = () => showMessage({
  message: 'Chào mừng bạn đến với VNLINE',
  icon: 'success',
  type: 'success',
  duration: 2000
});

export const postUploadedNotification = () => showMessage({
  message: 'Tải lên thành công, giờ đây bạn bè của bạn có thể xem bài viết',
  icon: 'success',
  type: 'success',
  duration: 2000
});

export const uploadErrorNotification = (asset: string) => showMessage({
  message: `${asset} tải lên thất bại, vui lòng thử lại sau`,
  icon: 'danger',
  type: 'danger',
  duration: 2000
});

export const inputLimitErrorNotification = (type: string, condition: string, limit: number) => showMessage({
  message: `${type} nên ${condition} hơn ${limit} ký tự`,
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const somethingWentWrongErrorNotification = () => showMessage({
  message: 'Oops, vui lòng thử lại sau',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});


export const showErrorNotification = (message: string) => showMessage({
  message,
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const noAssetInfoNotification = () => showMessage({
  message: 'Vui lòng tải lên hình ảnh trước khi đăng bài',
  icon: 'info',
  type: 'info',
  backgroundColor: ThemeStatic.accent,
  duration: 2000
});

export const noPermissionNotification = () => showMessage({
  message: 'Vui lòng cho phép truy cập hình ảnh',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const longPressDeleteNotification = onLongPress => showMessage({
  message: 'Nhấn và giữ thông báo này để xóa',
  icon: 'danger',
  type: 'danger',
  duration: 4000,
  backgroundColor: ThemeStatic.delete,
  onLongPress
});

export const tryAgainLaterNotification = () => showMessage({
  message: 'Vui lòng thử lại sau',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const postReportedNotification = () => showMessage({
  message: 'Bài viết đã được báo cáo, vui lòng đợi quản trị viên xem xét',
  icon: 'info',
  type: 'info',
  backgroundColor: ThemeStatic.accent,
  duration: 4000
});

export const postUpdatedNotification = () => showMessage({
  message: 'Bài viết đã được cập nhật',
  icon: 'success',
  type: 'success',
  duration: 2000
});

export const postDeletedNotification = () => showMessage({
  message: 'Bài viết đã bị xóa',
  icon: 'info',
  type: 'info',
  backgroundColor: ThemeStatic.accent,
  duration: 2000
});

export const userBlockedNotification = (handle: string = 'User') => showMessage({
  message: `${handle} đã bị chặn, vui lòng tải lại`,
  icon: 'info',
  type: 'info',
  backgroundColor: ThemeStatic.accent,
  duration: 4000
});

export const longPressUnblockNotification = (onLongPress, handle) => showMessage({
  message: `Nhấn và giữ thông báo này để mở chặn ${handle}`,
  icon: 'danger',
  type: 'danger',
  duration: 4000,
  backgroundColor: ThemeStatic.delete,
  onLongPress
});