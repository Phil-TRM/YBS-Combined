const express = require("express");
const router = express.Router();
const PlansModal = require("../../Modals/Settings/PricingModal");
const PlansHistoryModal = require("../../Modals/PriceHistoy");
const UserModal = require("../../Modals/AuthModal");
const sendMail = require("../../util/sendEmail");

router.post("/", async (req, res) => {
  try {
    const priceData = await PlansModal.find().sort({ $natural: -1 }).limit(2);
    res.send({ priceData });
  } catch (error) {
    res.sendStatus(500);
  }
});
router.put("/history", async (req, res) => {
  try {
    const { email, pid, transId } = req.body;

    const plan = await PlansModal.findOne({ _id: pid });

    let data = {
      email: email,
      pid: pid,
      transId,
      price: plan.price,
      validity: plan.validity,
    };

    let userUpdate = {
      from: getDate(),
      validity: plan.validity,
      planName: plan.validity > 30 ? "Yearly" : "Monthly",
      planId: pid,
    };

    const userUpdates = await UserModal.updateOne(
      { email: email },
      {
        $set: {
          planDetails: userUpdate,
          isPlanExpired: false,
        },
      }
    );

    const history = new PlansHistoryModal(data);

    history.save().then(async (data, err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({
          data,
        });
        const user = await UserModal.findOne({ email: email });
        await sendMail({
          email: user.email,
          subject: "Confirmation Email",
          message: `Thank you for purchasing our ${
            plan.validity > 30 ? "Yearly" : "Monthly"
          } plan for $${plan.price} `,
        });
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/history", async (req, res) => {
  try {
    const { email } = req.body;

    const history = await PlansHistoryModal.find({ email: email }).sort({
      $natural: -1,
    });
    if (history != null && history.length > 0) {
      res.send({
        data: history,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/details-by-id", async (req, res) => {
  try {
    const { pid } = req.body;

    const plan = await PlansModal.findOne({ _id: pid });
    if (plan != null) {
      res.send({
        data: plan,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/historyforanaltics", async (req, res) => {
  try {
    const plan = await PlansHistoryModal.aggregate([
      {
        $match: {
          $expr: {
            $gt: [
              "$date",
              {
                $dateSubtract: { startDate: "$$NOW", unit: "day", amount: 30 },
              },
            ],
          },
        },
      },
    ]);

    if (plan != null && plan.length > 0) {
      res.send({
        data: plan,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/history-all", async (req, res) => {
  try {
    const history = await PlansHistoryModal.find().sort({ $natural: -1 });
    if (history != null && history.length > 0) {
      let mainData = new Array();
      for (let i = 0; i < history.length; i++) {
        const element = history[i];
        const use = await UserModal.findOne({ email: element.email });
        let data = {
          id: element._id,
          image: use.dp,
          name: use.name,
          email: use.email,
          currentPlan: element.validity > 30 ? "Yearly" : "Monthly",
          paypal: element.email,
          paymentId: element.transId,
          createdAt: element.createdAt,
          price:element.price
        };
        mainData.push(data);
      }
      res.send({
        data:mainData
      })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

function getDate() {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  let dates =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return dates;
}

module.exports = router;
