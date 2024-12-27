import { useNavigation } from 'react-router-dom';
import Loader from '../../components/Loader';
import PageNav from '../../components/PageNav';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="page">
      <PageNav />
      <div className="relative flex h-[90vh] overflow-y-auto px-10">
        {isLoading && <Loader />}
        <div className="w-[33rem] flex-none">
          <Sidebar />
        </div>
        <div className="flex-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Applayout;
