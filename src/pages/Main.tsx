import React, { useCallback, useEffect, useState } from 'react';
import { Heading, VStack, Input, Icon, Button, Box, useColorMode } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { listAllStocks, listDataStock, requestAction } from './services/B3';
import { FundamentalData, RootObject } from './modules/modules';

const Main = () => {
  const [value, setValue] = useState<string>('');
  const [stock, setStock] = useState<RootObject | null>();
  const [stocksList, setStocksList] = useState<Array<string>>(['']);
  const [fundamentaDataList, setFundamentaDataList] = useState<Array<FundamentalData>>();
  const { setColorMode } = useColorMode();

  const listAllStocksRequest = useCallback(async () => {
    try {
      setStocksList(((await listAllStocks()) as any).data.stocks);
    } catch (err) {}
  }, []);

  useEffect(() => {
    listAllStocksRequest();
    setColorMode('dark');
  }, []);

  const handleSetValue = (val: any) => {
    setValue(val);
  };

  const handleSearchStock = async () => {
    handleSearchStockList();
    handleSearchStockFundamentals();
  };
  const handleSearchStockList = async () => {
    try {
      const response: RootObject = ((await requestAction(value)) as any).data;
      setStock(response);
    } catch (err) {}
  };

  const handleSearchStockFundamentals = async () => {
    try {
      const response: Array<FundamentalData> = ((await listDataStock(value)) as any).data;
      setFundamentaDataList(response);
      console.log('aqui', response);
    } catch (err) {
      console.log('aqui fund', value, err);
    }
  };

  return (
    <VStack w='100%' space={5} alignSelf='center'>
      <Heading fontSize='lg'>Pesquise pelo código da ação desejada</Heading>

      <Input
        placeholder='Search'
        variant='filled'
        width='100%'
        borderRadius='10'
        py='1'
        px='2'
        borderWidth='0'
        value={value}
        onChangeText={handleSetValue}
        InputLeftElement={<Icon ml='2' size='4' color='gray.400' as={<Ionicons name='ios-search' />} />}
      />
      <Box alignItems='center'>
        <Button onPress={handleSearchStock}>Pesquisar</Button>
      </Box>
      <Heading fontSize='lg'>{`value: ${stock?.results[0].shortName}`}</Heading>
      <Heading fontSize='lg'>{`value: ${stock?.results[0].longName}`}</Heading>
      <Heading fontSize='lg'>{`value: ${stock?.results[0].symbol}`}</Heading>
      <Heading fontSize='lg'>{`value: ${stock?.results[0].currency}`}</Heading>
      <Heading fontSize='lg'>{`value: ${stock?.results[0].regularMarketPrice}`}</Heading>
      {fundamentaDataList &&
        fundamentaDataList?.map((data: FundamentalData, idx: number) => {
          return (
            <Box alignItems='center'>
              <Heading fontSize='sm'>{`${data.title}: ${data.value} - ${data.details}`}</Heading>
              <Heading fontSize='sm'>{`------------------------------------------------`}</Heading>
            </Box>
          );
        })}
    </VStack>
  );
};

export default Main;
