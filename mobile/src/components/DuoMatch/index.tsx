import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {MaterialIcons} from '@expo/vector-icons'
import { THEME } from "../../theme";
import {CheckCircle} from 'phosphor-react-native'
import { Heading } from "../Heading";
import * as ClipBoard from 'expo-clipboard'
import { useState } from "react";


interface Props extends ModalProps {
    discord: string;
    onClose: () => void
}
export function DuoMatch({discord, onClose, ...rest}: Props) {
    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true)
        await ClipBoard.setStringAsync(discord)

        Alert.alert('discord name', 'Texto copiado')
        setIsCopping(false)
    }

    return (
        <Modal {...rest} animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold"/>
                    <Heading title="Let's Play!" subtitle="Agora é só começar a jogar!" style={{alignItems: 'center', marginTop: 24}} />


                    <Text style={styles.label}>
                        Adicione seu Discord
                    </Text>

                    <TouchableOpacity style={styles.discordButtom}
                        onPress={handleCopyDiscordToClipBoard}
                        disabled={isCopping}
                    >

                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}