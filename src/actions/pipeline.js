/*
 * This file is part of Smartkube Console.
 * Copyright (C) 2019 The Smartkube Console Authors.
 *
 * Smartkube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Smartkube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Smartkube Console.  If not, see <https://www.gnu.org/licenses/>.
 */
import { toJS } from 'mobx'
import { Modal, Notify } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'

export default {
  'pipeline.batch.delete': {
    on({ store, success, rowKey, devops, cluster, ...props }) {
      const { data, selectedRowKeys } = toJS(store.list)
      const selectNames = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            if (selectNames.includes(item.name)) {
              reqs.push(store.deletePipeline(item.name, devops, cluster))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: `${t('Deleted Successfully')}!` })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}