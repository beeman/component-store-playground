import { WorkflowGroup, WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { WorkflowHelper } from './workflow-helper'

describe('WorkflowHelper', () => {
  const tree: WorkflowGroup = {
    id: '1',
    type: WorkflowType.group,
    children: [
      {
        id: '2',
        parentId: '1',
        type: WorkflowType.group,
        children: [
          {
            id: '4',
            parentId: '2',
            type: WorkflowType.group,
            children: [{ id: '5', parentId: '4', type: WorkflowType.condition, value: false }],
          },
        ],
      },
      { id: '3', parentId: '1', type: WorkflowType.condition, value: false },
    ],
  }
  const groupNodes = new Map()
    .set('1', {
      id: '1',
      type: WorkflowType.group,
      children: [
        { id: '2', type: WorkflowType.group },
        { id: '3', type: WorkflowType.condition },
      ],
    })
    .set('2', {
      id: '2',
      parentId: '1',
      type: WorkflowType.group,
      children: [{ id: '4', type: WorkflowType.group }],
    })
    .set('4', {
      id: '4',
      parentId: '2',
      type: WorkflowType.group,
      children: [{ id: '5', type: WorkflowType.condition }],
    })

  const conditionNodes = new Map()
    .set('3', { id: '3', parentId: '1', type: WorkflowType.condition, value: false })
    .set('5', { id: '5', parentId: '4', type: WorkflowType.condition, value: false })

  describe('isGroup', () => {
    it('should return true if type is Group', () => {
      const node = { type: WorkflowType.group }
      expect(WorkflowHelper.isGroup(node)).toEqual(true)
    })

    it('should return false if type is Condition', () => {
      const node = { type: WorkflowType.condition }
      expect(WorkflowHelper.isGroup(node)).toEqual(false)
    })
  })

  describe('normalize', () => {
    it('should normalize WorkflowGroup into groupNodes and conditionNodes', () => {
      const { groupNodes: groups, conditionNodes: conditions } = WorkflowHelper.normalize(tree)
      expect(groups.size).toEqual(3)
      expect(groups).toEqual(groupNodes)
      expect(conditions.size).toEqual(2)
      expect(conditions).toEqual(conditionNodes)
    })
  })

  describe('denormalize', () => {
    it('should denormalize groupNodes and conditionNodes into WorkflowGroup', () => {
      const denormalized = WorkflowHelper.denormalize(groupNodes, conditionNodes)
      expect(denormalized).toEqual(tree)
    })
  })

  describe('deleteGroupRecursive', () => {
    it('should delete all child nodes', () => {
      const groups = new Map(groupNodes.entries())
      const conditions = new Map(conditionNodes.entries())

      expect(groups.size).toEqual(3)
      expect(conditions.size).toEqual(2)

      WorkflowHelper.deleteGroupRecursive(groups, conditions, groupNodes.get('2'))

      expect(groups.size).toEqual(1)
      expect(conditions.size).toEqual(1)
    })
  })
})
