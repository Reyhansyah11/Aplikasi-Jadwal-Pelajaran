import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

type HariNavigationProps = {
  selectedDay: string;
  onSelect: (day: string) => void;
};

const HariNavigation: React.FC<HariNavigationProps> = ({ selectedDay, onSelect }) => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  return (
    <View className="flex-row justify-around bg-gray-200 p-2">
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          onPress={() => onSelect(day)}
          className={`px-4 py-2 rounded ${
            selectedDay === day ? 'bg-blue-600' : 'bg-white'
          }`}
        >
          <Text className={`${selectedDay === day ? 'text-white' : 'text-black'} font-semibold`}>
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HariNavigation;
