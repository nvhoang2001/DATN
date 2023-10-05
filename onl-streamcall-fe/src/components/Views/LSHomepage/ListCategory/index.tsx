import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { Typography } from "@mui/material";

import Gaming from "@/assets/images/gaming.png";
import Music from "@/assets/images/music.png";
import Talkshow from "@/assets/images/talkshow.png";
import Wellness from "@/assets/images/wellness.png";
import Cooking from "@/assets/images/cooking.png";
import DIY from "@/assets/images/DIY.png";
import Education from "@/assets/images/education.png";
import Beauty from "@/assets/images/beauty.png";
import Travel from "@/assets/images/travel.png";
import Entertainment from "@/assets/images/entertainment.png";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { livestreamActions } from "@/store/livestreamSlice";

const listCategories = [
  { title: "#Gaming", value: "Gaming", url: Gaming, isActive: false },
  { title: "#Music", value: "Music", url: Music, isActive: false },
  { title: "#Talkshow", value: "Talkshow", url: Talkshow, isActive: false },
  { title: "#Wellness", value: "Wellness", url: Wellness, isActive: false },
  { title: "#Cooking", value: "Cooking", url: Cooking, isActive: false },
  { title: "#DIY", value: "DIY", url: DIY, isActive: false },
  { title: "#Education", value: "Education", url: Education, isActive: false },
  { title: "#Beauty", value: "Beauty", url: Beauty, isActive: false },
  { title: "#Travel", value: "Travel", url: Travel, isActive: false },
  { title: "#Entertainment", value: "Entertainment", url: Entertainment, isActive: false },
];

interface ICategory {
  title: string;
  value: string;
  url: string;
  isActive: boolean;
}

type TCategoryItem = {
  title: string;
  value: string;
  url: string;
  isActive: boolean;
  onActive: (value: string, isActive: boolean) => void;
};

const ListCategory = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [filterCategory, setFilterCategory] = useState<ICategory[]>(() => {
    return listCategories;
  });

  const selected: string[] = [];

  const handleActive = (value: string, isActive: boolean) => {
    selected.push(value);

    const result = filterCategory.map((el: ICategory) => {
      if (selected.includes(el.value)) {
        return {
          ...el,
          isActive: !isActive,
        };
      }

      return { ...el };
    });

    setFilterCategory((pre) => (pre = result));

    const activeList = result.filter((el) => el.isActive).map((el) => el.value);

    dispatch(livestreamActions.setParams({ listCategory_has: activeList }));

    if (activeList.length > 0) {
      dispatch(livestreamActions.setFilter(true));
    } else {
      dispatch(livestreamActions.setFilter(false));
    }
  };

  return (
    <>
      <Typography className={classes.title}>Select your category</Typography>
      <div className={classes.wrapList}>
        {filterCategory.map((el: ICategory) => {
          return <CategoryItem {...el} onActive={handleActive} key={el.value} />;
        })}
      </div>
    </>
  );
};

export const CategoryItem: React.FC<TCategoryItem> = ({ title, url, value, isActive, onActive }) => {
  const classes = useStyles();

  return (
    <div
      onClick={() => {
        onActive(value, isActive);
      }}
      className={classes.itemList}
    >
      <div className={classNames({ [classes.overlay]: isActive })}>
        <img src={url} alt="bg" />
        <span className={classes.tagName}>{title}</span>
      </div>
    </div>
  );
};

export default ListCategory;
