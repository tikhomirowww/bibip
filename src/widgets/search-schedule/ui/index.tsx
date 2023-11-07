"use client";
import React, { useState, forwardRef, FC, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ruLocale from "date-fns/locale/ru";
import Image from "next/image";
import { CustomButton } from "@/shared";
import { Direction, searchDirections } from "@/helpers/searchDirections";
import Dropdown from "@/shared/ui/dropdown/ui";
import {
  useGetDirectionsQuery,
  useLazySearchTripCitiesQuery,
} from "@/services/BibipTripService";
import { useDispatch } from "react-redux";
import { fromDirection, toDirection } from "@/slices/direction-slice";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { saveTrips } from "@/slices/trips-slice";

interface ExampleCustomInputProps {
  value: string;
  onClick: () => void;
}

const ExampleCustomInput: FC<ExampleCustomInputProps> = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value, onClick }, ref) => (
  <div className="bg-[#fff] py-[12px] w-[200px]">
    <p className="text-[#95A5BC] text-[12px] ml-8 mb-1">Дата отправления</p>
    <button className="flex" onClick={onClick} ref={ref}>
      <Image src="/note.svg" width="25" height="25" alt="" className="mr-2" />
      <span className="text-[14px]">{value}</span>
    </button>
  </div>
));

const SearchSelect = () => {
  const [from, setFrom] = useState<Direction | undefined>(undefined);
  const [fromStr, setFromStr] = useState("");
  const [to, setTo] = useState<Direction>();
  const [toStr, setToStr] = useState("");
  const [fromDirections, setFromDirections] = useState<Direction[]>([]);
  const [toDirections, setToDirections] = useState<Direction[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isFromInputFocused, setIsFromInputFocused] = useState(false);
  const [isToInputFocused, setIsToInputFocused] = useState(false);

  registerLocale("ru", ruLocale);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: directionData,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useGetDirectionsQuery();

  const [
    getTickets,
    { data: tickets, isLoading: isUpdating, isSuccess: isGotAnswer },
  ] = useLazySearchTripCitiesQuery();

  const onSaveTrip = () => {
    if (from && to && startDate) {
      dispatch(fromDirection({ from }));
      dispatch(toDirection({ to }));
      getTickets({
        departureCity: from.locality,
        destinationCity: to.locality,
        date: formatDate(startDate),
      });
    }
  };
  const handleFromInputFocus = () => {
    setIsFromInputFocused(true);
  };

  const handleToInputFocus = () => {
    setIsToInputFocused(true);
  };

  const clearFromInput = () => {
    setFromStr("");
  };

  const clearToInput = () => {
    setToStr("");
  };

  useEffect(() => {
    if (isGotAnswer) {
      dispatch(saveTrips(tickets));
      router.push("/direction-bus");
    }
  }, [isGotAnswer, tickets, dispatch, router]);

  return (
    <div className="py-[10px] relative flex items-center mb-7 mt-6 justify-between pr-5 bg-[#fff] rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[70px]">
      <div className="relative">
        <Image
          src="/location.svg"
          alt=""
          width="24"
          height="24"
          className="absolute top-[11px] left-[12px]"
        />
        {fromDirections && fromDirections.length !== 0 ? (
          <Dropdown
            content={fromDirections}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            setFrom={setFrom}
            setFromDirections={setFromDirections}
            setFromStr={setFromStr}
          />
        ) : null}
        <input
          type="text"
          placeholder="Откуда"
          className="w-full py-3 pl-10 pr-10 rounded-r-none border-r border-[#F5F5F5] rounded-md focus:outline-none focus:ring focus:border-blue-300 text-[16px] "
          value={fromStr}
          onChange={(e) => {
            setFromDirections(
              searchDirections(
                e.target.value,
                directionData && directionData.travel_directions,
                fromStr,
              ),
            );
            setFromStr(e.target.value);
          }}
        />
        {isFromInputFocused && (
          <button
            onClick={clearFromInput}
            className="absolute right-3 top-[11px] transform  w-6 h-6 text-gray-400"
          >
            <Image src="/x-circle.svg" width={24} height={25} alt="circle" />
          </button>
        )}
      </div>
      <div className="relative">
        <Image
          src="/location-tick.svg"
          width="24"
          height="24"
          alt=""
          className="absolute top-[10px] left-[5px]"
        />
        {toDirections && toDirections.length !== 0 ? (
          <Dropdown
            content={toDirections}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            setFrom={setTo}
            setFromDirections={setToDirections}
            setFromStr={setToStr}
          />
        ) : null}
        <input
          type="text"
          placeholder="Куда"
          className="w-full py-3 pl-10 pr-10 rounded-l-none rounded-md focus:outline-none focus:ring focus:border-blue-300 text-[16px]"
          value={toStr}
          onChange={(e) => {
            setToDirections(
              searchDirections(
                e.target.value,
                directionData && directionData.travel_directions,
                fromStr,
              ),
            );
            setToStr(e.target.value);
          }}
        />
        {isToInputFocused && (
          <button
            onClick={clearToInput}
            className="absolute right-3 top-[11px] transform  w-6 h-6 text-gray-400"
          >
            <Image src="/x-circle.svg" width={24} height={25} alt="circle" />
          </button>
        )}
      </div>
      <div className="relative flex">
        <div className="flex">
          <Image src="/note.svg" width={24} height={25} alt="note" />
          <div className="ml-[14px]">
            <p className="text-[#95A5BC] text-[12px] ">Дата отправления</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              locale={ruLocale}
              dateFormat="dd MMM eeeeee"
              placeholderText="Выберите дату"
              className="text-[14px]"
            />
          </div>
        </div>
      </div>
      {/*<div>*/}
      {/*  <DatePicker*/}
      {/*    selected={startDate}*/}
      {/*    onChange={(date) => setStartDate(date as Date)}*/}
      {/*    // customInput={*/}
      {/*    //   <ExampleCustomInput*/}
      {/*    //     value={formatDate(startDate as Date)}*/}
      {/*    //     onClick={() => {}}*/}
      {/*    //   />*/}
      {/*    // }*/}
      {/*    locale={ruLocale}*/}
      {/*    dateFormat="dd MMM eee"*/}
      {/*    placeholderText="Выберите дату"*/}
      {/*  />*/}
      {/*</div>*/}

      <div className="ml-10 py-2">
        <CustomButton
          title="Найти"
          containerStyles="bg-[#FFA723] text-white font-medium text-[15px] min-w-[194px]"
          onClick={onSaveTrip}
        />
      </div>

      {/* <ul className="absolute top-[100px] left-0 right-0 border border-gray-300 bg-white z-10 rounded-md shadow-md">
        <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Москва</li>
      </ul> */}
    </div>
  );
};

export default SearchSelect;
