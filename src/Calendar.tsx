import {useState,useEffect} from "react";
import dayjs, { Dayjs } from "dayjs";
import ja from "dayjs/locale/ja";
import "./calendar.css";
import type { CalendarType } from "./types";
import { initCalendar } from "./initCalendar";

dayjs.locale(ja);

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [calendarData, setCalendarData] = useState<CalendarType[]>([]);
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "CalendarApp";

  // LocalStorage からカレンダーデータを読み込み
  useEffect(() => {
    const calendarJsonStr = localStorage.getItem(localStorageKey);
    if (calendarJsonStr && calendarJsonStr !== "[]") {
      const storedData: CalendarType[] = JSON.parse(calendarJsonStr);
      const convertedData = storedData.map((data) => ({
        ...data,
        currentDate: dayjs(data.currentDate),  // 文字列を dayjs に変換
      }));
      setCalendarData(convertedData);
    } else {
      // LocalStorage にデータがない場合は initCalendar をセットする
      setCalendarData(initCalendar());
    }
    setInitialized(true);
  }, []);

  // 状態 calendarData または initialized に変更があったときデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(calendarData));
    }
  }, [calendarData, initialized]);
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();
  const today = dayjs();

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const gensinVersionData: CalendarType[] = calendarData[0] ? [calendarData[0]] : [];
  const starrailVersionData: CalendarType[] = calendarData[1] ? [calendarData[1]] : [];
  const meityouVersionData: CalendarType[] = calendarData[2] ? [calendarData[2]] : [];

  for (let i = 0; i < 16; i++) {
    const current = gensinVersionData[i];
    if (!current) break;
    const nextData: CalendarType = {
      ...current,
      currentDate: current.currentDate.add(21, "day"),
      version: {
        ver: current.version.isFirst ? current.version.ver : current.version.ver*10 % 10 === 8 ? current.version.ver + 0.2 : current.version.ver + 0.1,
        isFirst: !current.version.isFirst
      }
    };
    gensinVersionData.push(nextData);
  }

  for (let i = 0; i < 16; i++) {
    const current = starrailVersionData[i];
    if (!current) break;
    const nextData: CalendarType = {
      ...current,
      currentDate: current.currentDate.add(21, "day"),
      version: {
        ver: current.version.isFirst ? current.version.ver : current.version.ver*10 % 10 === 8 ? current.version.ver + 0.2 : current.version.ver + 0.1,
        isFirst: !current.version.isFirst
      }
    };
    starrailVersionData.push(nextData);
  }

  for (let i = 0; i < 16; i++) {
    const current = meityouVersionData[i];
    if (!current) break;
    const nextData: CalendarType = {
      ...current,
      currentDate: current.currentDate.add(21, "day"),
      version: {
        ver: current.version.isFirst ? current.version.ver : current.version.ver*10 % 10 === 8 ? current.version.ver + 0.2 : current.version.ver + 0.1,
        isFirst: !current.version.isFirst
      }
    };
    meityouVersionData.push(nextData);
  }
  // カレンダーの日付配列を作成
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // 週単位で分割
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-button">
          ←
        </button>
        <h2 className="calendar-title">
          {currentDate.format("YYYY年 MMMM")}
        </h2>
        <button onClick={handleNextMonth} className="calendar-button">
          →
        </button>
      </div>


      <div className="calendar">
        {/* 曜日ヘッダー */}
        <div className="calendar-weekdays">
          {weekDays.map((day, idx) => (
            <div
              key={day}
              className={`calendar-weekday ${
                idx === 0 ? "sunday" : idx === 6 ? "saturday" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日付 */}
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="calendar-week">
            {week.map((day, dayIdx) => {
              const isToday =
                day &&
                currentDate.year() === today.year() &&
                currentDate.month() === today.month() &&
                day === today.date();

              const isCurrentMonth = day !== null;

              // 各ゲームの該当日付を確認
              const gensinData = gensinVersionData.find(
                (data) =>
                  data &&
                  currentDate.year() === data.currentDate.year() &&
                  currentDate.month() === data.currentDate.month() &&
                  day === data.currentDate.date()
              );

              const starrailData = starrailVersionData.find(
                (data) =>
                  data &&
                  currentDate.year() === data.currentDate.year() &&
                  currentDate.month() === data.currentDate.month() &&
                  day === data.currentDate.date()
              );

              const meityouData = meityouVersionData.find(
                (data) =>
                  data &&
                  currentDate.year() === data.currentDate.year() &&
                  currentDate.month() === data.currentDate.month() &&
                  day === data.currentDate.date()
              );

              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`calendar-day ${
                    isToday ? "today" : ""
                  } ${
                    !isCurrentMonth ? "other-month" : ""
                  } ${
                    dayIdx === 0 ? "sunday" : dayIdx === 6 ? "saturday" : ""
                  }`}
                >
                <div className="flex">
                  <div className="calendar-day-games">
                    {gensinData && <div className="game-label gensin">原神</div>}
                    {starrailData && <div className="game-label starrail">スタレ</div>}
                    {meityouData && <div className="game-label meiyou">鳴潮</div>}
                  </div>
                  <div className="calendar-day-number">{day}</div>
                </div>
                  {gensinData && (
                    <div className="version-label">
                      Ver {gensinData.version.ver.toFixed(1)} {gensinData.version.isFirst ? "前半" : "後半"}
                    </div>
                  )}
                    {starrailData && (
                    <div className="version-label">
                        Ver {starrailData.version.ver.toFixed(1)} {starrailData.version.isFirst ? "前半" : "後半"}
                    </div>
                    )}
                    {meityouData && (
                    <div className="version-label">
                        Ver {meityouData.version.ver.toFixed(1)} {meityouData.version.isFirst ? "前半" : "後半"}
                    </div>
                    )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
