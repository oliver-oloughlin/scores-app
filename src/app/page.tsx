"use client";

import styles from "../styles/Home.module.css";
import { ControllerIcon } from "src/assets/icons/ControllerIcon";
import { Button, ButtonColor, ButtonVariant } from "src/components/Button";
import { PersonIcon } from "src/assets/icons/PersonIcon";
import { GroupIcon } from "src/assets/icons/GroupIcon";
import Input from "src/components/Input";
import { ScrollableLargeCards } from "src/components/ScrollableLargeCards";
import { Game } from "src/fire-base/models";
import { CardItem } from "src/components/Card";
import { Timestamp } from "firebase/firestore";
import {
  differenceBetweenFirestoreTimestampsInDays,
  mapGroupsToCardItems,
} from "src/utils/util";
import PageWrapper from "src/components/PageWrapper";
import { useGetGroupsForCurrentUser } from "../store/hooks";
import { DataStatus } from "../store/store.types";
import { useRouter } from "next/navigation";

export default function Home() {
  const groupsWithStatus = useGetGroupsForCurrentUser();
  const router = useRouter();

  //Mock groups
  // const groups: Group[] = [
  //   { name: "SnømannGutta", emoji: "⛄", games: [], invitationCode: "5673" },
  //   { name: "GolfGjengen", emoji: "⛳", games: [], invitationCode: "4822" },
  //   { name: "BasketBALLERS", emoji: "⛹", games: [], invitationCode: "5721" },
  //   { name: "Pubgruppen", emoji: "✨", games: [], invitationCode: "9031" },
  // ];

  if (
    !groupsWithStatus.data ||
    groupsWithStatus.status === DataStatus.LOADING
  ) {
    return <p>Loading...</p>;
  }

  const cardItemsGroups: CardItem[] = mapGroupsToCardItems(
    groupsWithStatus.data,
    true,
    router
  );

  //Mock games
  const games: Game[] = [
    {
      adminId: "",
      gameTypeId: "69",
      groupId: "420",
      players: [{ playerId: "1", points: 50 }],
      winner: "1",
      timestamp: Timestamp.fromDate(new Date(2023, 2, 21)),
      status: "ONGOING",
    },
    {
      adminId: "",
      gameTypeId: "420",
      groupId: "69",
      players: [{ playerId: "2", points: 69 }],
      winner: "3",
      timestamp: Timestamp.fromDate(new Date(2023, 2, 18)),
      status: "FINISHED",
    },
    {
      adminId: "",
      gameTypeId: "69",
      groupId: "420",
      players: [{ playerId: "4", points: 420 }],
      winner: "5",
      timestamp: Timestamp.fromDate(new Date(2023, 2, 10)),
      status: "FINISHED",
    },
  ];

  const cardItemsGames: CardItem[] = games
    .filter((game) => game.state == "FINISHED")
    .map((game, i) => {
      const diffDays = differenceBetweenFirestoreTimestampsInDays(
        game.timestamp,
        Timestamp.fromDate(new Date())
      );
      return {
        key: i.toString(),
        title: `${diffDays} dager siden`,
        labels: ["Noe relevant info", "Annen info"],
        emoji: "",
      };
    });
  //Must update paths
  return (
    <PageWrapper title='Velkommen!' authenticated={true}>
      <div className={styles["buttons-container"]}>
        <div className={styles["button-container"]}>
          <Button
            variant={ButtonVariant.Action}
            withLink
            href='/?pressed=profile'
          >
            <PersonIcon />
          </Button>
          <p className={styles.label}>Profil</p>
        </div>
        <div className={styles["button-container"]}>
          <Button
            variant={ButtonVariant.Action}
            color={ButtonColor.Orange}
            withLink
            href='/game/new'
          >
            <ControllerIcon />
          </Button>
          <p className={styles.label}>Nytt spill</p>
        </div>
        <div className={styles["button-container"]}>
          <Button
            variant={ButtonVariant.Action}
            color={ButtonColor.Pink}
            withLink
            href='/create-group'
          >
            <GroupIcon />
          </Button>
          <p className={styles.label}>Ny gruppe</p>
        </div>
      </div>
      <h2 className={styles["title-centered"]}>Bli med i en gruppe</h2>
      <div className={styles["group-input-container"]}>
        <Input
          type='text'
          className={styles["text-input"]}
          placeholder='Invitasjons-kode...'
        />
        <Button variant={ButtonVariant.Medium} color={ButtonColor.Red}>
          Bli med
        </Button>
      </div>
      <h2 className={styles.title}>Dine grupper</h2>
      <div className={styles["cards-container"]}>
        <ScrollableLargeCards items={cardItemsGroups} />
      </div>
      <h2 className={styles.title}>Nylige spill</h2>
      <div className={styles["cards-container"]}>
        <ScrollableLargeCards items={cardItemsGames} />
      </div>
    </PageWrapper>
  );
}
