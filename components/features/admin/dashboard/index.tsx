import Clicks from "./Clicks";
import DeviceStatistics from "./device-statistics";
import Engagement from "./engagement";
import Urls from "./Urls";
import Users from "./Users";

function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Users />
        <Clicks />
        <Urls />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        <div className="col-span-3">
          <Engagement />
        </div>
        <div>
          <DeviceStatistics />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
