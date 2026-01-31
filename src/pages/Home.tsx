import { MarketTimeline } from '../components/MarketTimeline';
import { MarketMap } from '../components/MarketMap';

export const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Gantt Chart Section */}
      <section>
        <MarketTimeline />
      </section>

      {/* Map Section */}
      <section>
        <MarketMap />
      </section>
    </div>
  );
};
