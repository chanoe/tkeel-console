import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon, ChevronLeftFilledIcon } from '@tkeel/console-icons';

import InfoCard from './InfoCard';
import MoreActionButton from './MoreActionButton';

// import InstallButton from '@/tkeel-console-plugin-admin-plugins/components/InstallButton';

function BasicInfo() {
  const navigate = useNavigate();
  const basicInfo = [
    {
      label: 'Repo',
      value: 'tKeel',
    },
    {
      label: '仓库地址',
      value: 'https://tkeel-io.github.io/helm-charts',
    },
    {
      label: 'Tag',
      value: '用户',
    },
    {
      label: 'Ver',
      value: '3.1.1',
    },
    {
      label: '更新时间',
      value: '2020.12.21 12:43:41',
    },
  ];

  return (
    <Box
      width="100%"
      height="350px"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
    >
      <Box height="130px" padding="16px" backgroundColor="gray.50">
        <Flex height="28px" justifyContent="space-between">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeftFilledIcon />}
            onClick={() => {
              navigate('/');
            }}
          >
            返回
          </Button>
          {/* <InstallButton size="sm" /> */}
          <MoreActionButton />
        </Flex>
        <Flex marginTop="16px" alignItems="center">
          <Center
            width="48px"
            height="48px"
            borderRadius="16px"
            backgroundColor="gray.100"
          >
            <BoxTwoToneIcon size={22} />
          </Center>
          <Box marginLeft="16px">
            <Text color="gray.800" fontSize="14px" lineHeight="20px">
              device
            </Text>
            <Text color="gray.500" fontSize="12px" lineHeight="17px">
              安装用于管理设备的插件
            </Text>
          </Box>
        </Flex>
      </Box>
      <InfoCard data={basicInfo} />
    </Box>
  );
}

export default BasicInfo;
