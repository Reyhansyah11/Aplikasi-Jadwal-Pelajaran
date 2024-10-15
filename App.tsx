import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
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
  [key: string]: {
    ganjil: Jadwal[];
    genap: Jadwal[];
  };
};

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const MainScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Senin');
  const [startX, setStartX] = useState<number>(0);
  const [isGanjil, setIsGanjil] = useState<boolean>(true);

  const jadwal: JadwalData = {
    Senin: {
      ganjil: [
        { jam: '07:00 - 09:00', ruangan: 'Lab 1', kelas: 'XII RPL 1' },
        { jam: '09:20 - 11:00', ruangan: 'Ruang A', kelas: 'XII RPL 2' },
        { jam: '11:20 - 13:00', ruangan: 'Ruang B', kelas: 'XII TKJ 1' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 2', kelas: 'XII TKJ 2' },
      ],
      genap: [
        { jam: '07:00 - 09:00', ruangan: 'Ruang AB', kelas: 'XI MM 1' },
        { jam: '09:20 - 11:00', ruangan: 'Lab 9', kelas: 'XI DKV 2' },
        { jam: '11:20 - 13:00', ruangan: 'Lab 1', kelas: 'XI RPL 1' },
        { jam: '13:20 - 15:00', ruangan: 'Ruang A', kelas: 'XI TKJ 2' },
        { jam: '15:20 - 17:00', ruangan: 'Lab 7', kelas: 'XI DKV 3' },
      ],
    },
  
    Selasa: {
      ganjil: [
        { jam: '07:00 - 09:00', ruangan: 'Lab 6', kelas: 'XII RPL 1' },
        { jam: '09:20 - 11:00', ruangan: 'Ruang A', kelas: 'XII RPL 2' },
        { jam: '11:20 - 13:00', ruangan: 'Ruang C', kelas: 'XII TBS 3' },
      ],
      genap: [
        { jam: '07:00 - 09:00', ruangan: 'Ruang AB', kelas: 'XI MM 1' },
        { jam: '09:00 - 11:00', ruangan: 'Lab 9', kelas: 'XI DKV 2' },
        { jam: '11:20 - 13:00', ruangan: 'Ruang B', kelas: 'XI TKJ 1' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 6', kelas: 'XI TKJ 3' },
        { jam: '15:20 - 17:00', ruangan: 'Ruang C', kelas: 'XI RPL 2' },
      ],
    },
  
    Rabu: {
      ganjil: [
        { jam: '07:00 - 15:00', ruangan: 'Lab 4', kelas: 'XII MM 1' },
      ],
      genap: [
        { jam: '07:00 - 09:00', ruangan: 'Ruang AB', kelas: 'XI MM 2' },
        { jam: '09:20 - 11:00', ruangan: 'Lab 9', kelas: 'XI DKV 3' },
        { jam: '11:20 - 13:00', ruangan: 'Ruang C', kelas: 'XI RPL 1' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 2', kelas: 'XI TKJ 2' },
        { jam: '15:20 - 17:00', ruangan: 'Lab 6', kelas: 'XI DKV 4' },
      ],
    },
  
    Kamis: {
      ganjil: [
        { jam: '07:00 - 09:00', ruangan: 'Lab 2', kelas: 'XII MM 1' },
        { jam: '09:20 - 11:00', ruangan: 'Ruang D', kelas: 'XII DKV 2' },
        { jam: '11:20 - 13:00', ruangan: 'Lab 3', kelas: 'XII RPL 3' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 4', kelas: 'XII TKJ 1' },
        { jam: '15:20 - 17:00', ruangan: 'Ruang B', kelas: 'XII RPL 4' },
      ],
      genap: [
        { jam: '07:00 - 09:00', ruangan: 'Ruang A', kelas: 'XI MM 1' },
        { jam: '09:20 - 11:00', ruangan: 'Lab 8', kelas: 'XI DKV 3' },
        { jam: '11:20 - 13:00', ruangan: 'Ruang C', kelas: 'XI TKJ 2' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 1', kelas: 'XI RPL 1' },
        { jam: '15:20 - 17:00', ruangan: 'Lab 6', kelas: 'XI DKV 4' },
      ],
    },
  
    Jumat: {
      ganjil: [
        { jam: '07:00 - 09:00', ruangan: 'Lab 3', kelas: 'XII MM 2' },
        { jam: '09:20 - 11:00', ruangan: 'Lab 5', kelas: 'XII DKV 2' },
        { jam: '11:20 - 13:00', ruangan: 'Lab 2', kelas: 'XII RPL 4' },
        { jam: '15:20 - 17:00', ruangan: 'Lab 7', kelas: 'XII RPL 1' },
      ],
      genap: [
        { jam: '07:00 - 09:00', ruangan: 'Ruang A', kelas: 'XI MM 1' },
        { jam: '09:20 - 11:00', ruangan: 'Lab 9', kelas: 'XI DKV 2' },
        { jam: '11:20 - 13:00', ruangan: 'Lab 1', kelas: 'XI TKJ 1' },
        { jam: '13:20 - 15:00', ruangan: 'Lab 6', kelas: 'XI RPL 3' },
        { jam: '15:20 - 17:00', ruangan: 'Lab 5', kelas: 'XI DKV 3' },
      ],
    },
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
          const threshold = 50;
          const translationX = e.nativeEvent.translationX;

          if (e.nativeEvent.state === 2 /* BEGAN */) {
            setStartX(translationX);
          }

          if (e.nativeEvent.state === 4 /* ACTIVE */) {
            const deltaX = startX - translationX;
            if (deltaX > threshold) {
              handleSwipe('left');
              setStartX(translationX);
            } else if (deltaX < -threshold) {
              handleSwipe('right');
              setStartX(translationX);
            }
          }
        }}
      >
        <ScrollView className="flex-1 p-4">
          {isGanjil
            ? jadwal[selectedDay]?.ganjil.map((item, index) => (
                <JadwalCard key={index} jam={item.jam} ruangan={item.ruangan} kelas={item.kelas} />
              ))
            : jadwal[selectedDay]?.genap.map((item, index) => (
                <JadwalCard key={index} jam={item.jam} ruangan={item.ruangan} kelas={item.kelas} />
              ))}

          <Text className="text-center mt-4">Geser untuk melihat jadwal hari lain</Text>
        </ScrollView>
      </PanGestureHandler>

      {/* Navigasi Minggu Ganjil dan Genap */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => setIsGanjil(true)}
          style={{
            flex: 1, // Mengisi penuh lebar layar
            padding: 15,
            backgroundColor: isGanjil ? '#1d4ed8' : '#E0E0E0',
            marginRight: 5, // Jarak antar tombol
            borderRadius: 5,
            alignItems: 'center', // Menyelaraskan teks ke tengah
          }}
        >
          <Text style={{ color: isGanjil ? '#FFFFFF' : '#000000', fontWeight: 'bold' }}>Minggu Ganjil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsGanjil(false)}
          style={{
            flex: 1, // Mengisi penuh lebar layar
            padding: 15,
            backgroundColor: !isGanjil ? '#1d4ed8' : '#E0E0E0',
            marginLeft: 5, // Jarak antar tombol
            borderRadius: 5,
            alignItems: 'center', // Menyelaraskan teks ke tengah
          }}
        >
          <Text style={{ color: !isGanjil ? '#FFFFFF' : '#000000', fontWeight: 'bold' }}>Minggu Genap</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default MainScreen;
