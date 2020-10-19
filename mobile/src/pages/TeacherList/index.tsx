import React, { useState, SyntheticEvent, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import { View, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'

import classService, { ClassFilterParams } from '../../services/class';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, BorderlessButton } from 'react-native-gesture-handler';

function TeacherList() {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [teacherList, setTeacherList] = useState([]);
    const [filters, setFilters] = useState<ClassFilterParams>({});


    async function fetchClasses() {
        const teachers = await classService.get({});
        setTeacherList(teachers);
    }

    useFocusEffect(
        useCallback(() => {
            fetchClasses();
        }, []);
    );
    
    function handleToggleFiltersVisible() {
        setShowFilters(!showFilters);
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Available Proffys" headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
                )}>
                {showFilters && <View style={styles.searchForm}>
                    <Text style={styles.label}>Subject</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={filters.subject}
                        onValueChange={(itemValue) =>
                            setFilters({
                                ...filters,
                                subject: itemValue.toString()
                            })
                        }>
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Math" value="Math" />
                        <Picker.Item label="English" value="English" />
                    </Picker>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Weekday</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={filters.weekday}
                                onValueChange={(itemValue) =>
                                    setFilters({
                                        ...filters,
                                        weekday: Number(itemValue.toString())
                                    })
                                }>
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Sunday" value="0" />
                                <Picker.Item label="Monday" value="1" />
                                <Picker.Item label="Tuesday" value="2" />
                                <Picker.Item label="Wednesday" value="3" />
                                <Picker.Item label="Thursday" value="4" />
                                <Picker.Item label="Friday" value="5" />
                                <Picker.Item label="Saturday" value="6" />
                            </Picker>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            {showDatePicker && <DateTimePicker
                                testID="dateTimePicker"
                                style={styles.input}
                                value={date}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || date;
                                    setShowDatePicker(false);
                                    setDate(currentDate);
                                    setFilters({
                                        ...filters,
                                        time: currentDate.toLocaleTimeString()
                                    });
                                }}
                            />}
                            <Text style={styles.input} onPress={() => setShowDatePicker(true)}>{filters.time}</Text>
                        </View>
                    </View>
                </View>}

            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teacherList.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}

            </ScrollView>

        </View>
    );
}

export default TeacherList;