import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

import {
  AlarmInfoCard,
  AlarmLevelTag,
  AlarmRuleTypeTag,
  NotificationObjectsInfoCard,
} from '@tkeel/console-business-components';
import { Drawer, MoreAction, Tooltip } from '@tkeel/console-components';
import { ComputingLampTwoToneIcon } from '@tkeel/console-icons';
import { useAlarmRuleDetailQuery } from '@tkeel/console-request-hooks';
import { AlarmSourceObject } from '@tkeel/console-types';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import {
  ALARM_SOURCE_OBJECT_MAP,
  ALARM_TYPE_MAP,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import SwitchStatusButton from '../SwitchStatusButton';

type Props = {
  ruleId: number;
  onClose: () => void;
  refetchData: () => void;
};

function PolicyDetailDrawer({ ruleId, onClose, refetchData }: Props) {
  const { ruleDetail, refetch } = useAlarmRuleDetailQuery({ ruleId });
  let alarmSourceObject: ReactNode = '-';
  if (ruleDetail?.alarmSourceObject === AlarmSourceObject.Device) {
    alarmSourceObject = (
      <Flex alignItems="center">
        <ComputingLampTwoToneIcon />
        <Tooltip label={ruleDetail?.deviceName}>
          <Text marginLeft="2px" width="170px" noOfLines={1}>
            {ruleDetail?.deviceName}
          </Text>
        </Tooltip>
      </Flex>
    );
  } else if (ruleDetail?.alarmSourceObject) {
    alarmSourceObject = ALARM_SOURCE_OBJECT_MAP[ruleDetail?.alarmSourceObject];
  }

  const alarmInfoArr = [
    {
      label: '告警策略名称',
      value: ruleDetail?.ruleName,
    },
    {
      label: '告警类型',
      value:
        ruleDetail?.alarmType === undefined
          ? '-'
          : ALARM_TYPE_MAP[ruleDetail?.alarmType],
    },
    {
      label: '告警策略类型',
      value:
        ruleDetail?.alarmRuleType === undefined ? (
          '-'
        ) : (
          <AlarmRuleTypeTag type={ruleDetail?.alarmRuleType} />
        ),
    },
    {
      label: '告警级别',
      value: ruleDetail?.alarmLevel ? (
        <AlarmLevelTag level={ruleDetail?.alarmLevel} />
      ) : (
        ''
      ),
    },
    {
      label: '告警源对象',
      value: alarmSourceObject,
    },
    {
      label: '告警源对象ID',
      value: (
        <Tooltip label={ruleDetail?.deviceId || ''}>
          <Text width="200px" noOfLines={1}>
            {ruleDetail?.deviceId || '-'}
          </Text>
        </Tooltip>
      ),
    },
    {
      label: '规则描述',
      value: ruleDetail?.ruleDesc,
    },
  ];

  const titleStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  const handleSuccess = () => {
    refetch();
    refetchData();
  };

  return (
    <Drawer
      id="policyDetail"
      isOpen
      title="告警策略详情"
      width="700px"
      onClose={onClose}
    >
      <Flex flexDirection="column" padding="16px 32px">
        <Flex justifyContent="space-between">
          <Text {...titleStyle}>告警信息</Text>
          <Flex alignItems="center">
            <Text color="gray.700" fontSize="12px" fontWeight="500">
              状态：
            </Text>
            {ruleDetail && (
              <SwitchStatusButton
                status={ruleDetail?.enable}
                ruleId={ruleDetail?.ruleId}
                onSuccess={handleSuccess}
              />
            )}
            <MoreAction
              sx={{ marginLeft: '4px' }}
              styles={{ actionList: { width: '124px' } }}
              buttons={
                ruleDetail
                  ? [
                      <ModifyPolicyButton
                        key="modify"
                        policy={ruleDetail as Policy}
                        onSuccess={handleSuccess}
                      />,
                      <DeletePolicyButton
                        key="delete"
                        policy={ruleDetail as Policy}
                        onSuccess={handleSuccess}
                      />,
                    ]
                  : []
              }
            />
          </Flex>
        </Flex>
        <AlarmInfoCard info={alarmInfoArr} />
        <Text marginBottom="8px" {...titleStyle} marginTop="20px">
          通知对象
        </Text>
        <NotificationObjectsInfoCard noticeId={ruleDetail?.noticeId || ''} />
      </Flex>
    </Drawer>
  );
}

export default memo(PolicyDetailDrawer);
