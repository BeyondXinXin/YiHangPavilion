import { useSettingStore } from '~/store/setting'
import { useBookmarkStore } from '~/store/bookmarks'
import axios from 'axios';

// 推送数据到服务端
export async function pushDataToServer() {
    const bookmarkStore = useBookmarkStore();
    const settingStore = useSettingStore();

    try {
        const response = await axios.post('https://api.beyondxin.top/store', bookmarkStore.customData, {
            params: {
                passphrase: settingStore.passphrase,
            },
        });

        if (response.status === 200) {
            console.log('Data stored successfully');
        } else {
            console.error('Failed to store data:', response.data);
        }
    } catch (error) {
        console.error('Error pushing data to server:', error);
    }
}

// 从服务端获取数据
export async function retrieveDataFromServer() {
    const bookmarkStore = useBookmarkStore();
    const settingStore = useSettingStore();

    try {
        const response = await axios.get('https://api.beyondxin.top/retrieve', {
            params: {
                passphrase: settingStore.passphrase,
            },
        });

        if (response.status === 200) {
            // 将获取的数据存入 Pinia store
            bookmarkStore.customData = response.data;
            console.log('Data retrieved successfully');
        } else {
            console.error('Failed to retrieve data:', response.data);
        }
    } catch (error) {
        console.error('Error retrieving data from server:', error);
    }
}
