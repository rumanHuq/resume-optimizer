import type { JobSuitabilitySchema } from '@/schemas/schemas';
import {
  Blockquote,
  Box,
  Divider,
  Group,
  List,
  Paper,
  RingProgress,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconBulb, IconCheck, IconInfoCircle, IconUserSearch, IconX } from '@tabler/icons-react';
import type React from 'react';

interface SuitabilityResultProps {
  data: Partial<JobSuitabilitySchema> | undefined | null;
}

const getScoreColor = (score = 0) => {
  if (score >= 80) return 'teal';
  if (score >= 50) return 'yellow';
  return 'red';
};

const getMatchColor = (variant?: string) => {
  switch (variant) {
    case 'Full':
      return 'teal.7';
    case 'Partial':
      return 'yellow.8';
    default:
      return 'gray.6';
  }
};

export const SuitabilityResult: React.FC<SuitabilityResultProps> = ({ data }) => {
  if (!data) return null;

  const overallScore = data.overallSuitabilityPercentage ?? 0;
  const atsScore = data.atsCompatibilityPercentage ?? 0;

  return (
    <Stack gap='md'>
      {/* 1. Score Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
        <Paper shadow='xs' radius='md' p='md' withBorder>
          <Group wrap='nowrap' align='center'>
            <RingProgress
              size={80}
              thickness={8}
              roundCaps
              label={
                <Text ta='center' fw={700} size='sm'>
                  {overallScore}%
                </Text>
              }
              sections={[{ value: overallScore, color: getScoreColor(overallScore) }]}
            />
            <Box style={{ flex: 1 }}>
              <Text size='xs' fw={700} tt='uppercase' c='dimmed'>
                Overall Fit
              </Text>
              <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
                {data.overallSuitabilityReason ?? <Skeleton height={8} mt={6} width='100%' />}
              </Text>
            </Box>
          </Group>
        </Paper>

        <Paper shadow='xs' radius='md' p='md' withBorder>
          <Group wrap='nowrap' align='center'>
            <RingProgress
              size={80}
              thickness={8}
              roundCaps
              label={
                <Text ta='center' fw={700} size='sm'>
                  {atsScore}%
                </Text>
              }
              sections={[{ value: atsScore, color: getScoreColor(atsScore) }]}
            />
            <Box style={{ flex: 1 }}>
              <Text size='xs' fw={700} tt='uppercase' c='dimmed'>
                ATS Match
              </Text>
              <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
                {data.atsCompatibilityReason ?? <Skeleton height={8} mt={6} width='100%' />}
              </Text>
            </Box>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* 2. Criteria Analysis */}
      <Paper shadow='xs' radius='md' p='md' withBorder>
        <Title order={5} mb='sm'>
          Matching Criteria
        </Title>
        <List listStyleType='none' spacing='xs'>
          {(data.matchingCriteria ?? []).length > 0 ? (
            data.matchingCriteria?.map((item, idx) => (
              <List.Item key={idx}>
                <Group gap='xs' wrap='nowrap' align='center'>
                  <ThemeIcon color={getMatchColor(item.matchLevel)} variant='light' size={18} radius='xl'>
                    <IconCheck size={12} />
                  </ThemeIcon>
                  <Box>
                    <Text size='sm' fw={500} style={{ overflowWrap: 'anywhere' }}>
                      {item.criterion}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      {item.matchLevel} Match
                    </Text>
                  </Box>
                </Group>
              </List.Item>
            ))
          ) : (
            <Skeleton height={40} width='100%' />
          )}
        </List>

        <Divider my='lg' label='Gap Analysis' labelPosition='center' />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='lg'>
          <Stack gap='xs'>
            <Text fw={700} size='xs' c='red.7' tt='uppercase'>
              Missing Keywords
            </Text>
            <List listStyleType='none' spacing='xs'>
              {data.missingCriteria?.map((crit, i) => (
                <List.Item key={i}>
                  <Group gap='xs' wrap='nowrap' align='flex-start'>
                    <IconX size={14} color='var(--mantine-color-red-6)' style={{ marginTop: 4 }} />
                    <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
                      {crit}
                    </Text>
                  </Group>
                </List.Item>
              ))}
            </List>
          </Stack>

          <Stack gap='xs'>
            <Text fw={700} size='xs' c='orange.7' tt='uppercase'>
              ATS Issues
            </Text>
            <List listStyleType='none' spacing='xs'>
              {data.atsIssues?.map((issue, i) => (
                <List.Item key={i}>
                  <Group gap='xs' wrap='nowrap' align='flex-start'>
                    <IconInfoCircle
                      size={14}
                      color='var(--mantine-color-orange-6)'
                      style={{ marginTop: 4 }}
                    />
                    <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
                      {issue}
                    </Text>
                  </Group>
                </List.Item>
              ))}
            </List>
          </Stack>
        </SimpleGrid>
      </Paper>

      {/* 3. Actionable Insights */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
        <Blockquote
          color='blue'
          icon={<IconUserSearch size={22} />}
          radius='md'
          styles={{ icon: { alignSelf: 'flex-start' } }}
        >
          <Text fw={700} size='xs' tt='uppercase' mb={4} c='blue.8'>
            Recruiter Insight
          </Text>
          <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
            {data.pointerForRecruiter ?? <Skeleton height={8} mt={6} />}
          </Text>
        </Blockquote>

        <Blockquote
          color='teal'
          icon={<IconBulb size={22} />}
          radius='md'
          styles={{ icon: { alignSelf: 'flex-start' } }}
        >
          <Text fw={700} size='xs' tt='uppercase' mb={4} c='teal.8'>
            Candidate Advice
          </Text>
          <Text size='sm' style={{ overflowWrap: 'anywhere' }}>
            {data.pointerForCandidate ?? <Skeleton height={8} mt={6} />}
          </Text>
        </Blockquote>
      </SimpleGrid>
    </Stack>
  );
};
