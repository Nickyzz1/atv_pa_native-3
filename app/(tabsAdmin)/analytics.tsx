import Card from "@/components/card";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, Dimensions } from "react-native";


interface IProduct {
    name: string;
    quantidade: number;
    valor_vendido: number;
    id: number;
    image: string;
}

interface IData {
    quantidade_produtos_vendidos: number,
    total_vendido: number
}

interface IAnalyticsResponse {
    vendas_por_produto: { [key: string]: IProduct };
}

export default function Analytics() {
    const [analytics, setAnalytics] = useState<IProduct[]>([]);
    const [data, setData] = useState<IData>();

    const getAnalytics = async () => {
        try {
            const response = await axios.get<IAnalyticsResponse>(`http://127.0.0.1:5000/analytics`);
            console.log('Resposta da requisição: ', response.data);
            const responseTwo = await axios.get(`http://127.0.0.1:5000/analytics`);
            setData(responseTwo.data);

            const products = Object.values(response.data.vendas_por_produto).map((product, index) => ({
                id: index + 1,
                name: product.name,
                quantidade: product.quantidade,
                valor_vendido: product.valor_vendido,
                image: '',
            }));
            
            setAnalytics(products);

        } catch (error) {
            console.log('Erro ao buscar produtos: ', error);
        }
    };

    const renderItems = ({ item }: { item: IProduct }) => {
        return (
            <>
                <Card title={item.name} price={item.valor_vendido} image={item.image} />
            </>
        );
    };

    useEffect(() => {
        getAnalytics();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('@/assets/images/logo.png')} style={styles.logo}></Image>
                <Text style={styles.title}>Análises</Text>
            </View>

            <View>
                {data ? (
                    <View style={styles.box}>
                        <View style={styles.boxCard}>
                            <Card title={data?.quantidade_produtos_vendidos.toString()} titleTwo="Quantidade vendida"></Card>
                            <Card title={data?.total_vendido.toString()} titleTwo="Preço total"></Card>
                        </View>
                    </View>
                ): null}
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Produtos Vendidos:</Text>
                    <FlatList style={styles.flatList} data={analytics} renderItem={renderItems} keyExtractor={(item) => item.id.toString()} />
                </View>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    boxCard: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        
    },

    subTitle: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.rosaEscuro.background,
        // marginLeft: 30,
        marginTop : 10,
    },
    flatList: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.rosaClaro.background,
        overflowY: 'scroll',
        height: height,
        width: width,
        alignItems: 'center',
        padding: 10,
        overflowX: 'hidden',
    },
    title: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.font.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -width / 9 }],
    },
    header: {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
    },
    logo: {
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        margin: 10,
        maxWidth: width,
        flexWrap: 'wrap',
        justifyContent: 'center',
        minWidth: width - 30
    },
});
