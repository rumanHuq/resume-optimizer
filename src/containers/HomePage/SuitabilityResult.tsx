import type { JobSuitabilitySchema } from '@/schemas/schemas';
import {
  Badge,
  Blockquote,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  RingProgress,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconBulb, IconInfoCircle, IconUserSearch, IconX } from '@tabler/icons-react';
import { uuid } from '@tanstack/react-form';
import type React from 'react';

interface SuitabilityResultProps {
  // Accepting Partial because streamObject returns partials initially
  data: Partial<JobSuitabilitySchema> | undefined | null;
}

// Helper to safely get color even if value is undefined during stream
const getScoreColor = (score: number = 0) => {
  if (score >= 80) return 'teal';
  if (score >= 50) return 'yellow';
  return 'red';
};

const getMatchBadgeColor = (variant: string) => {
  switch (variant) {
    case 'Full':
      return 'green';
    case 'Partial':
      return 'yellow';
    default:
      return 'gray';
  }
};

export const SuitabilityResult: React.FC<SuitabilityResultProps> = ({ data }) => {
  if (!data) return null;

  // Safe accessors for streaming data
  const overallScore = data.overallSuitabilityPercentage ?? 0;
  const atsScore = data.atsCompatibilityPercentage ?? 0;
  const matchingCriteria = data.matchingCriteria ?? [];
  const missingCriteria = data.missingCriteria ?? [];
  const atsIssues = data.atsIssues ?? [];

  return (
    <Stack gap='md'>
      {/* 1. Score Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow='sm' radius='md' p='lg' withBorder>
            <Group justify='center' gap='xl'>
              <RingProgress
                size={120}
                roundCaps
                thickness={12}
                label={
                  <Text size='xl' fw={700} ta='center'>
                    {overallScore}%
                  </Text>
                }
                sections={[{ value: overallScore, color: getScoreColor(overallScore) }]}
              />
              <div style={{ flex: 1 }}>
                <Text size='lg' fw={600}>
                  Overall Fit
                </Text>
                <Text size='sm' c='dimmed'>
                  {data.overallSuitabilityReason ?? <Skeleton height={8} mt={6} width='80%' />}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow='sm' radius='md' p='lg' withBorder>
            <Group justify='center' gap='xl'>
              <RingProgress
                size={120}
                roundCaps
                thickness={12}
                label={
                  <Text size='xl' fw={700} ta='center'>
                    {atsScore}%
                  </Text>
                }
                sections={[{ value: atsScore, color: getScoreColor(atsScore) }]}
              />
              <div style={{ flex: 1 }}>
                <Text size='lg' fw={600}>
                  ATS Compatibility
                </Text>
                <Text size='sm' c='dimmed'>
                  {data.atsCompatibilityReason ?? <Skeleton height={8} mt={6} width='80%' />}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* 2. Criteria Breakdown */}
      <Paper shadow='sm' radius='md' p='lg' withBorder>
        <Title order={4} mb='md'>
          Matching Criteria
        </Title>
        <Group gap='xs' mb='lg' mih={40}>
          {matchingCriteria.length > 0 ? (
            matchingCriteria.map((item) => (
              <Badge key={uuid()} color={getMatchBadgeColor(item.matchLevel)} variant='light' size='lg'>
                {item.criterion}
              </Badge>
            ))
          ) : (
            <Text size='sm' c='dimmed'>
              Analyzing criteria...
            </Text>
          )}
        </Group>

        <Divider my='md' label='Areas for Improvement' labelPosition='center' />

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text fw={600} mb='xs' c='red.7'>
              Missing Keywords
            </Text>
            <List
              spacing='xs'
              size='sm'
              center
              icon={
                <ThemeIcon color='red' size={16} radius='xl'>
                  <IconX size={10} />
                </ThemeIcon>
              }
            >
              {missingCriteria.map((crit) => (
                <List.Item key={uuid()}>{crit}</List.Item>
              ))}
            </List>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text fw={600} mb='xs' c='orange.7'>
              ATS Issues
            </Text>
            <List
              spacing='xs'
              size='sm'
              center
              icon={
                <ThemeIcon color='orange' size={16} radius='xl'>
                  <IconInfoCircle size={10} />
                </ThemeIcon>
              }
            >
              {atsIssues.map((issue) => (
                <List.Item key={uuid()}>{issue}</List.Item>
              ))}
            </List>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* 3. Actionable Pointers */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Blockquote color='blue' icon={<IconUserSearch size={20} />} mt='xl' radius='md'>
            <Text fw={700} size='sm' mb={4}>
              Recruiter&#39;s Perspective
            </Text>
            <Text size='sm'>{data.pointerForRecruiter ?? <Skeleton height={8} mt={6} width='90%' />}</Text>
          </Blockquote>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Blockquote color='teal' icon={<IconBulb size={20} />} mt='xl' radius='md'>
            <Text fw={700} size='sm' mb={4}>
              Advice for Candidate
            </Text>
            <Text size='sm'>{data.pointerForCandidate ?? <Skeleton height={8} mt={6} width='90%' />}</Text>
          </Blockquote>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
