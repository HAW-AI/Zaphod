require 'spec_helper'

describe Score do
  let(:user) { FactoryGirl.create(:user) }
  let(:card) { FactoryGirl.create(:card) }
  let(:score_for_known) { Score.for(user, card) }
  let(:score_for_unknown) { Score.for(user, card) }
  let!(:score_before_known) { score_for_known.score }
  let!(:score_before_unknown) { score_for_unknown.score }

  describe :"self.for" do
    subject { score_for_known }
    context "right after creation" do
      its(:score) { should == 0.0 }
      its(:count) { should == 1 }
    end
  end

  describe :known do
    it "should continuously increase" do
      score_for_known.known
      score_for_known.reload
      score_for_known.score.should > score_before_known
    end
  end

  describe :unknown do
    its "should continuously decrease" do
      score_for_unknown.unknown
      score_for_unknown.reload
      score_for_unknown.score.should < score_before_unknown
    end
  end
end
