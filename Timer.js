import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";

function Timer({ starttime, onDurationUpdate }) {
    const [duration, setDuration] = useState(0);
    const [lastUpdateMinute, setLastUpdateMinute] = useState(0);

    // 格式化时间为 hh:mm:ss
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        const startTime = new Date(starttime);

        // 每秒更新一次
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000); // 计算总秒数

            setDuration(elapsedTime);

            // 每分钟更新一次父组件
            const elapsedMinutes = Math.floor(elapsedTime / 60);
            if (elapsedMinutes !== lastUpdateMinute) {
                setLastUpdateMinute(elapsedMinutes);
                if (onDurationUpdate) {
                    onDurationUpdate(elapsedMinutes);
                }
            }
        }, 1000);

        // 清理定时器
        return () => {
            clearInterval(intervalId);
        };
    }, [starttime, lastUpdateMinute, onDurationUpdate]);
    
    const clearTimer = () => {
        clearInterval(timerId);
    };

    return (
        <Text style={styles.timer}>
            {formatTime(duration)} {/* 格式化时间并显示 */}
        </Text>
    );
}

export default Timer;

const styles = StyleSheet.create({
    timer: {
        fontSize: 25,
        fontWeight: "600", // 比 bold 稍轻，更现代的视觉效果
        color: "#2C3E50", // 深蓝灰色，柔和而清晰
        letterSpacing: 1.3, // 增加字母间距，使数字更易读
        textAlign: "center", // 居中对齐
        backgroundColor: "#EFEFEF", // 添加淡灰背景，区分时间显示区域
        paddingVertical: 5, // 垂直填充，使文本更舒适
        paddingHorizontal: 10, // 水平填充
        borderRadius: 10, // 圆角边框，柔化整体视觉效果
        overflow: "hidden", // 防止背景扩展超出
        shadowColor: "#000", // 添加阴影，立体感
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});
