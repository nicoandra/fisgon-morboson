import { api } from '../common/api'

const { useGetCameras } = api.queries

function StatusBox() {
    const { data, isLoading, isError } = useGetCameras();

    if (isLoading) {
      return <div>Loading, pa...</div>
    }

    return (<div>Box has {data?.length} cameras</div>);
  }
export default StatusBox
