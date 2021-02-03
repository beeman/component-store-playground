import {
  NormalizedWorkflowGroup,
  WorkflowCondition,
  WorkflowGroup,
  WorkflowType,
} from '@component-store-playground/playground/workflows/data-access'

export const secondLevelCondition: WorkflowCondition = {
  id: '3',
  parentId: '2',
  type: WorkflowType.condition,
  value: false,
}

export const firstLevelGroup: WorkflowGroup = {
  id: '2',
  parentId: '1',
  type: WorkflowType.group,
  level: 1,
  children: [secondLevelCondition],
}

export const rootGroup: WorkflowGroup = {
  id: '1',
  type: WorkflowType.group,
  level: 0,
  children: [firstLevelGroup],
}

export const firstLevelGroupNoChild: WorkflowGroup = {
  ...firstLevelGroup,
  children: [],
}

export const rootGroupWithFirstLevelGroupNoChild: WorkflowGroup = {
  ...rootGroup,
  children: [firstLevelGroupNoChild],
}

export const normalizedRootGroup: NormalizedWorkflowGroup = {
  ...rootGroup,
  children: [{ id: firstLevelGroup.id, type: WorkflowType.group }],
}

export const normalizedRootGroupWithFirstLevelGroupNoChild: NormalizedWorkflowGroup = {
  ...rootGroupWithFirstLevelGroupNoChild,
  children: [{ id: firstLevelGroupNoChild.id, type: WorkflowType.group }],
}

export const normalizedFirstGroup: NormalizedWorkflowGroup = {
  ...firstLevelGroup,
  children: [{ id: secondLevelCondition.id, type: WorkflowType.condition }],
}

export const normalizedFirstGroupNoChild: NormalizedWorkflowGroup = {
  ...firstLevelGroupNoChild,
  children: [],
}
