import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

type JadwalCardProps = {
  jam: string;
  ruangan: string;
  kelas: string;
};

const JadwalCard: React.FC<JadwalCardProps> = ({ jam, ruangan, kelas }) => {
  return (
    <View className="border p-4 m-2 bg-white rounded shadow-sm">
      <Text className="text-lg font-bold">Jam: {jam}</Text>
      <Text className="text-sm">Ruangan: {ruangan}</Text>
      <Text className="text-sm">Kelas/Jurusan: {kelas}</Text>
    </View>
  );
};

export default JadwalCard;
