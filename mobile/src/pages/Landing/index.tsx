import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import styles from './styles';
import { useSafeArea } from 'react-native-safe-area-context';
import connectionService from '../../services/connection';

function Landing() {
    const {navigate } = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    function navigateToGiveClassesPage() {
        navigate('GiveClasses')
    }

    function navigateToStudyPages() {
        navigate('Study')
    }

    async function loadConnections() {
        const { total } = await connectionService.get();
        setTotalConnections(total);
    }

    useEffect(() => {
        loadConnections();
    }, [])

    return (<View style={styles.container}>
        <Image source={landingImg} style={styles.banner} />

        <Text style={styles.title}>
            Welcome, {'\n'}
            <Text style={styles.titleBold}>What do you want to do?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
            <RectButton
                onPress={navigateToStudyPages}
                style={[styles.button, styles.buttonPrimary]}
            >
                <Image source={studyIcon} />

                <Text style={styles.buttonText}>Study</Text>
            </RectButton>

            <RectButton
                onPress={navigateToGiveClassesPage}
                style={[styles.button, styles.buttonSecondary]}
            >
                <Image source={giveClassesIcon} />

                <Text style={styles.buttonText}>Give classes</Text>
            </RectButton>
        </View>

        <Text style={styles.totalConnections}>
            Total of {totalConnections} connections made {' '}
            <Image source={heartIcon} />
        </Text>
    </View>)
}

export default Landing;