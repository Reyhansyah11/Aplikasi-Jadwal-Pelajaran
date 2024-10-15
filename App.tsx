import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Navbar from './src/components/Navbar';
import HariNavigation from './src/components/HariNavigation';
import JadwalCard from './src/components/JadwalCard';

type Jadwal = {
  jam: string;
  ruangan: string;
  kelas: string;
};

type JadwalData = {
  [key: string]: Jadwal[];
};

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const MainScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Senin');
  const [startX, setStartX] = useState<number>(0); // Menyimpan posisi awal swipe

  const jadwal: JadwalData = {
    Senin: [
      { jam: '08:00 - 09:00', ruangan: '101', kelas: 'XII IPA 1' },
      { jam: '09:00 - 10:00', ruangan: '102', kelas: 'XII IPA 2' },
    ],
    Selasa: [
      { jam: '08:00 - 09:00', ruangan: '103', kelas: 'XI IPA 1' },
    ],
    Rabu: [
      { jam: '10:00 - 11:00', ruangan: '104', kelas: 'X IPA 2' },
    ],
    Kamis: [
      { jam: '11:00 - 12:00', ruangan: '105', kelas: 'XII IPS 1' },
    ],
    Jumat: [
      { jam: '13:00 - 14:00', ruangan: '106', kelas: 'XII IPS 2' },
    ],
  };

  const handleSwipe = (direction: string) => {
    const currentIndex = days.indexOf(selectedDay);
    if (direction === 'left' && currentIndex < days.length - 1) {
      setSelectedDay(days[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      setSelectedDay(days[currentIndex - 1]);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navbar />
      <HariNavigation selectedDay={selectedDay} onSelect={setSelectedDay} />
      <PanGestureHandler
        onGestureEvent={(e) => {
          const threshold = 25; // Ambang batas geseran 50px untuk swipe yang lebih halus
          const translationX = e.nativeEvent.translationX;

          // Mendeteksi swipe awal dan menyimpan posisi awal
          if (e.nativeEvent.state === 2 /* BEGAN */) {
            setStartX(translationX);
          }

          // Membandingkan posisi awal dengan posisi akhir dan memastikan geseran cukup besar
          if (e.nativeEvent.state === 4 /* ACTIVE */) {
            const deltaX = startX - translationX;
            if (deltaX > threshold) {
              handleSwipe('left');
              setStartX(translationX); // Reset posisi awal agar swipe lebih akurat
            } else if (deltaX < -threshold) {
              handleSwipe('right');
              setStartX(translationX); // Reset posisi awal agar swipe lebih akurat
            }
          }
        }}
      >
        <ScrollView className="flex-1 p-4">
          {jadwal[selectedDay]?.map((item, index) => (
            <JadwalCard key={index} jam={item.jam} ruangan={item.ruangan} kelas={item.kelas} />
          ))}
          <Text className="text-center mt-4">Geser untuk melihat jadwal hari lain</Text>
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default MainScreen;
